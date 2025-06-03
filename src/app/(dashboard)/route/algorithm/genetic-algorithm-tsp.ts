import { Waypoint } from '@/lib/types';

interface RouteResult {
  route: Waypoint[];
  distance: number;
}

const popSize = 200;
const numIterations = 10000;
const mutChance = 0.2;

function shuffle(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchDistanceMatrix(waypoints: { lat: number; lon: number }[]) {
  try {
    const response = await fetch('/api/getDistanceMatrix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ waypoints }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // distanceMatrix
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    return null;
  }
}

// Menghitung total jarak untuk sebuah rute
function calcTotalDistance(matrix: number[][], route: number[]): number {
  return route.reduce(
    (total, current, idx) =>
      idx < route.length - 1 ? total + matrix[current][route[idx + 1]] : total,
    0
  );
}

// Membuat populasi awal
function genInitialPopulation(waypoints: Waypoint[]): number[][] {
  const population: number[][] = [];
  const hub = [0];
  const indices = Array.from({ length: waypoints.length - 1 }, (_, i) => i + 1);

  for (let i = 0; i < popSize; i++) {
    shuffle(indices);
    population.push([...hub, ...indices, ...hub]);
  }

  return population;
}

// Membuat populasi baru
function genNewPopulation(
  population: number[][],
  matrix: number[][]
): number[][] {
  const probabilities = calculateProbabilities(population, matrix);
  const newPopulation: number[][] = [];

  for (let i = 0; i < popSize; i++) {
    const parent1 = selectParent(probabilities);
    const parent2 = selectParent(probabilities);
    const child = crossover(population[parent1], population[parent2]);

    if (Math.random() < mutChance) {
      mutate(child);
    }

    newPopulation.push(child);
  }

  return newPopulation;
}

// Menghitung probabilitas seleksi
function calculateProbabilities(
  population: number[][],
  matrix: number[][]
): number[] {
  const fitness = population.map(
    (individual) => 1 / calcTotalDistance(matrix, individual)
  );
  const totalFitness = fitness.reduce((a, b) => a + b, 0);
  return fitness.map((f) => f / totalFitness);
}

// Seleksi orang tua menggunakan roulette wheel
function selectParent(probabilities: number[]): number {
  let random = Math.random();
  for (let i = 0; i < probabilities.length; i++) {
    if (random < probabilities[i]) {
      return i;
    }
    random -= probabilities[i];
  }
  return probabilities.length - 1;
}

// Crossover dua individu
function crossover(parent1: number[], parent2: number[]): number[] {
  const size = parent1.length;
  const start = Math.floor(Math.random() * (size - 2)) + 1;
  const end = Math.floor(Math.random() * (size - start - 1)) + start;

  const child = parent1.slice(start, end);

  for (let i = 1; i < parent2.length - 1; i++) {
    if (!child.includes(parent2[i])) {
      child.push(parent2[i]);
    }
  }

  return [0, ...child, 0];
}

// Mutasi individu
function mutate(individual: number[]): void {
  const idx1 = Math.floor(Math.random() * (individual.length - 2)) + 1;
  const idx2 = Math.floor(Math.random() * (individual.length - 2)) + 1;

  [individual[idx1], individual[idx2]] = [individual[idx2], individual[idx1]];
}

// Fungsi utama untuk menghitung rute optimal
export default async function calculateOptimalRoute(
  dynamicWaypoints: Waypoint[]
): Promise<RouteResult> {
  const hub: Waypoint = {
    task_id: '',
    name: 'Hub Gudang',
    lat: 0.71087,
    lon: -1.29139,
  };
  const waypoints = [hub, ...dynamicWaypoints];

  const distanceMatrix = await fetchDistanceMatrix(waypoints);

  let population = genInitialPopulation(waypoints);
  for (let i = 0; i < numIterations; i++) {
    population = genNewPopulation(population, distanceMatrix);
  }

  const bestRoute = population.reduce((best, current) =>
    calcTotalDistance(distanceMatrix, current) <
    calcTotalDistance(distanceMatrix, best)
      ? current
      : best
  );

  const bestDistanceMeters = calcTotalDistance(distanceMatrix, bestRoute);
  const bestDistanceKilometers = bestDistanceMeters / 1000; // Konversi ke kilometer

  return {
    route: bestRoute.slice(1, -1).map((i) => waypoints[i]),
    distance: bestDistanceKilometers,
  };
}
