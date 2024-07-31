import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
} from 'rxjs';
import { Station } from '../../models/station.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectFilteredStations,
  selectLoading,
} from '../../store/state/station.state';
import {
  loadStations,
  updateStationQuery,
} from '../../store/actions/station.actions';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { StationCardComponent } from '../station-card/station-card.component';
import { DEBOUNCE_TIME } from '../../constants/debounce-time.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatFormField,
    MatProgressSpinner,
    AsyncPipe,
    MatInput,
    ReactiveFormsModule,
    StationCardComponent,
    MatLabel,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  searchControl = new FormControl('');
  loading$: Observable<boolean> = this.store.select(selectLoading);
  filteredStations$: Observable<Station[]> = this.store.select(
    selectFilteredStations,
  );
  error$: Observable<HttpErrorResponse> = this.store.select(selectError);

  ngOnInit(): void {
    this.loadStations();
    this.setupSearchControl();
  }

  private loadStations(): void {
    this.store.dispatch(loadStations());
  }

  private setupSearchControl(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => this.updateQuery(query));
  }

  updateQuery(query: string | null): void {
    this.store.dispatch(updateStationQuery({ value: query || '' }));
  }

  navigateToDetails(detailId: string) {
    this.router.navigate(['/dashboard', detailId]);
  }
}
