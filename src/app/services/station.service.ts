import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StationDetails } from '../models/station-details.interface';
import { StationOverview } from '../models/station-overview.interface';

@Injectable({ providedIn: 'root' })
export class StationService {
  private http = inject(HttpClient);

  getStations(): Observable<StationOverview> {
    return this.http.get<StationOverview>('api/railwayStationOverview');
  }

  getStationDetails(detailId: string): Observable<StationDetails> {
    return this.http.get<StationDetails>(
      `api/railwayStationDetails/${detailId}`,
    );
  }
}
