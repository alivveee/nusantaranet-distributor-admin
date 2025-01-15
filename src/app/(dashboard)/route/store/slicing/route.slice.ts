import { type StateCreator } from 'zustand';

export interface RouteState {
  // values
  selectedRoute: {
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
  } | null;

  // setter
  setSelectedRoute: (query: RouteState['selectedRoute']) => void;
}

// store's slices
const createRouteState: StateCreator<RouteState> = (set) => ({
  // initial values
  selectedRoute: null,

  // state handler
  setSelectedRoute(query) {
    return set({ selectedRoute: query });
  },
});

export default createRouteState;
