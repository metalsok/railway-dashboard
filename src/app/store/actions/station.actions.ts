import { createAction, props } from '@ngrx/store';
import { StationDetails } from '../../models/station-details.interface';
import {Station} from "../../models/station.interface";
import {HttpErrorResponse} from "@angular/common/http";

export const loadStations = createAction('[Station] Load Stations');
export const loadStationsSuccess = createAction(
  '[Station] Load Stations Success',
  props<{ value: Station[] }>(),
);
export const loadStationsFailure = createAction(
  '[Station] Load Stations Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const updateStationQuery = createAction(
  '[Station] Update Stations Query',
  props<{ value: string }>(),
);
export const loadStationDetails = createAction(
  '[Station] Load Station Details',
  props<{ id: string }>(),
);
export const loadStationDetailsSuccess = createAction(
  '[Station] Load Station Details Success',
  props<{ details: StationDetails }>(),
);
export const loadStationDetailsFailure = createAction(
  '[Station] Load Station Details Failure',
  props<{ error: HttpErrorResponse }>(),
);
