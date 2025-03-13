import { IRoute, Waypoint } from '@/lib/types';
import { type StateCreator } from 'zustand';


export interface RouteState {
  // values
  selectedRoute: IRoute | null;
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
