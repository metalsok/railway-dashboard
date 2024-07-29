import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { AsyncPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
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
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDivider } from '@angular/material/divider';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    AsyncPipe,
    MatCardTitle,
    MatCardSubtitle,
    NgOptimizedImage,
    MatButton,
    ReactiveFormsModule,
    MatProgressSpinner,
    RouterLink,
    MatDivider,
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
    this.store.dispatch(loadStations());
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) =>
        this.store.dispatch(updateStationQuery({ value: query || '' })),
      );
  }

  navigateToDetails(detailId: string) {
    this.router.navigate(['/dashboard', detailId]);
  }

}
