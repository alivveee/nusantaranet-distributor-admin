import { type StateCreator } from 'zustand';

type Route = {
  id: string;
  date: string;
  recipient: string;
  customer: {
    id: string;
    name: string;
    type: string;
  };
  startTime: string;
  endTime: string;
  duration: string;
  address: string;
  coordinates: string;
  status: 'Berhasil' | 'Berjalan' | 'Selesai';
  type: string;
};
export interface Waypoint {
  name: string;
  lat: number;
  lon: number;
}

export interface RouteState {
  // values
  selectedRoute: Route | null;
  waypoints: Waypoint[] | [];

  // setter
  setSelectedRoute: (query: RouteState['selectedRoute']) => void;
  setWaypoints: (query: RouteState['waypoints']) => void;
}

// store's slices
const createRouteState: StateCreator<RouteState> = (set) => ({
  // initial values
  selectedRoute: null,
  waypoints: [],

  // state handler
  setSelectedRoute(query) {
    return set({ selectedRoute: query });
  },
  setWaypoints(query) {
    return set({ waypoints: query });
  },
});

export default createRouteState;
