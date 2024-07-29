import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Station } from '../../models/station.interface';
import {
  loadStations,
  loadStationsFailure,
  loadStationsSuccess,
  updateStationQuery,
} from '../actions/station.actions';

export interface StationState {
  dashboardData: Station[];
  loading: boolean;
  error: any;
  query: string;
}

const initialState: StationState = {
  dashboardData: [],
  loading: false,
  error: null,
  query: '',
};

export const stationFeatureState = createFeature({
  name: 'stations',
  reducer: createReducer(
    initialState,
    on(loadStations, (state) => ({ ...state, loading: true })),
    on(loadStationsSuccess, (state, action) => ({
      ...state,
      dashboardData: action.value,
      loading: false,
    })),
    on(loadStationsFailure, (state, { error }) => ({
      ...state,
      dashboardData: [],
      error: error,
      loading: false,
    })),
    on(updateStationQuery, (state, action) => ({
      ...state,
      query: action.value,
    })),
  ),
  extraSelectors: (v) => {
    const { selectQuery, selectDashboardData } = v;
    return {
      selectFilteredStations: createSelector(
        selectQuery,
        selectDashboardData,
        (query, stations) =>
          stations.filter((station) =>
            station.location.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    };
  },
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectDashboardData, // feature selector
  selectLoading, //
  selectError,
  selectFilteredStations, // selector for `loading` property
} = stationFeatureState;
