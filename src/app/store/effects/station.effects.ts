import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadStationDetails,
  loadStationDetailsFailure,
  loadStationDetailsSuccess,
  loadStations,
  loadStationsFailure,
  loadStationsSuccess,
} from '../actions/station.actions';
import { StationService } from '../../services/station.service';

@Injectable()
export class StationEffects {
  constructor(
    private actions$: Actions,
    private stationService: StationService,
  ) {}

  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStations),
      mergeMap(() => {
        return this.stationService
          .getStations()
          .pipe(
            map((response) =>
              loadStationsSuccess({ value: response.dashboardData }),
            ),
          );
      }),
      catchError((error) => of(loadStationsFailure({ error }))),
    ),
  );

  loadStationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStationDetails),
      mergeMap(({ id }) =>
        this.stationService
          .getStationDetails(id)
          .pipe(map((details) => loadStationDetailsSuccess({ details }))),
      ),
      catchError((error) => of(loadStationDetailsFailure({ error }))),
    ),
  );
}
