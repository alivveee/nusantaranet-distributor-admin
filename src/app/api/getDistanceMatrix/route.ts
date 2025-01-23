import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''; // API key dari environment variable

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chunkArray = (array: any[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const waypoints: { lat: number; lon: number }[] = body.waypoints;

    if (!waypoints || !Array.isArray(waypoints)) {
      return NextResponse.json(
        { message: 'Invalid waypoints format' },
        { status: 400 }
      );
    }

    const originChunks = chunkArray(waypoints, 7); // Bagi batch 8
    const distanceMatrix: number[][] = [];

    for (let i = 0; i < originChunks.length; i++) {
      const origins = originChunks[i]
        .map((wp) => `${wp.lat},${wp.lon}`)
        .join('|');

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${waypoints
        .map((wp) => `${wp.lat},${wp.lon}`)
        .join('|')}&key=${GOOGLE_API_KEY}`;

      const response = await axios.get(url);

      if (response.data.status === 'OK') {
        const matrix = response.data.rows.map(
          (row: {
            elements: { status: string; distance?: { value: number } }[];
          }) =>
            row.elements.map(
              (el: { status: string; distance?: { value: number } }) => {
                if (el.status === 'OK' && el.distance) {
                  return el.distance.value; // distance in meters
                } else {
                  return null; // fallback value
                }
              }
            )
        );

        distanceMatrix.push(...matrix);
      } else {
        console.error(
          'Error fetching distance matrix:',
          response.data.error_message
        );
      }
    }

    return NextResponse.json(distanceMatrix);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in API route:', error.message);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
