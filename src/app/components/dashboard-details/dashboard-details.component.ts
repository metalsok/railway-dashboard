import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {
  selectDetailsError,
  selectDetailsLoading,
  selectStationDetails,
} from '../../store/state/station-details.state';
import { loadStationDetails } from '../../store/actions/station.actions';
import { Observable } from 'rxjs';
import { StationDetails } from '../../models/station-details.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-details',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinner],
  templateUrl: './dashboard-details.component.html',
  styleUrl: './dashboard-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDetailsComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private store: Store = inject(Store);
  private destroyRef: DestroyRef = inject(DestroyRef);
  loading$: Observable<boolean> = this.store.select(selectDetailsLoading);
  error$: Observable<HttpErrorResponse> = this.store.select(selectDetailsError);

  station$: Observable<StationDetails | null> =
    this.store.select(selectStationDetails);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ detailId }) =>
        this.store.dispatch(loadStationDetails({ id: detailId })),
      );
  }
}
