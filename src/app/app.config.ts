import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { stationFeatureState } from './store/state/station.state';
import { provideEffects } from '@ngrx/effects';
import { StationEffects } from './store/effects/station.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {stationDetailsFeatureState} from "./store/state/station-details.state";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideState(stationFeatureState),
    provideState(stationDetailsFeatureState),
    provideEffects([StationEffects]),
    provideStoreDevtools(),
  ],
};
