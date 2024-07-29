import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadStationDetails,
  loadStationDetailsFailure,
  loadStationDetailsSuccess,
} from '../actions/station.actions';
import { StationDetails } from '../../models/station-details.interface';

export interface StationDetailsState {
  details: StationDetails | null;
  loading: boolean;
  error: any;
}

export const initialStationDetailsState: StationDetailsState = {
  details: null,
  loading: false,
  error: null,
};

export const stationDetailsFeatureState = createFeature({
  name: 'stationDetails',
  reducer: createReducer(
    initialStationDetailsState,
    on(loadStationDetails, (state) => ({ ...state, loading: true })),
    on(loadStationDetailsSuccess, (state, { details }) => {
      console.log(state);
      return {
        ...state,
        loading: false,
        details,
      };
    }),
    on(loadStationDetailsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
  selectStationDetailsState,
  selectDetails: selectStationDetails,
  selectLoading: selectLoadingDetails,
  selectError: selectDetailsError,
} = stationDetailsFeatureState;
