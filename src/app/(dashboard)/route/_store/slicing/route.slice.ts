import { IRoute, Waypoint } from '@/lib/types';
import { type StateCreator } from 'zustand';

export interface RouteState {
  // values
  selectedRouteId: string | null;
  selectedRoute: IRoute | null;
  waypoints: Waypoint[] | [];

  // setter
  setSelectedRouteId: (query: RouteState['selectedRouteId']) => void;
  setSelectedRoute: (query: RouteState['selectedRoute']) => void;
  setWaypoints: (query: RouteState['waypoints']) => void;
}

// store's slices
const createRouteState: StateCreator<RouteState> = (set) => ({
  // initial values
  selectedRouteId: null,
  selectedRoute: null,
  waypoints: [],

  // state handler
  setSelectedRouteId(query) {
    return set({ selectedRouteId: query });
  },
  setSelectedRoute(query) {
    return set({ selectedRoute: query });
  },
  setWaypoints(query) {
    return set({ waypoints: query });
  },
});

export default createRouteState;
