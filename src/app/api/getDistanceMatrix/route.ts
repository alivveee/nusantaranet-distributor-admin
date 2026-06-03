import { NextResponse } from 'next/server';
import axios from 'axios';



// chunkArray removed

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

    const coordString = waypoints.map(wp => `${wp.lon},${wp.lat}`).join(';');
    
    // OSRM table API: http://router.project-osrm.org/table/v1/driving/{coordinates}?annotations=distance
    const url = `https://router.project-osrm.org/table/v1/driving/${coordString}?annotations=distance`;

    const response = await axios.get(url);

    let distanceMatrix: number[][] = [];

    if (response.data.code === 'Ok') {
      // OSRM returns distances in meters, as a 2D array: distances[origin_index][destination_index]
      distanceMatrix = response.data.distances;
    } else {
      console.error('Error fetching distance matrix from OSRM:', response.data);
    }

    return NextResponse.json(distanceMatrix);
  } catch (error) {
    console.error('Error in API route:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
