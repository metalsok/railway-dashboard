import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import {
  loadStations,
  updateStationQuery,
} from '../../store/actions/station.actions';
import { StationCardComponent } from '../station-card/station-card.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {DEBOUNCE_TIME} from "../../constants/debounce-time.const";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  const initialState = {
    stations: {
      filteredStations: [],
      loading: false,
      error: null,
      query: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        ReactiveFormsModule,
        StationCardComponent,
        DashboardComponent,
        NoopAnimationsModule,
        BrowserAnimationsModule,
      ],
      declarations: [],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should dispatch loadStations action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadStations());
  });

  it('should update store when searchControl value changes', fakeAsync(() => {
    component.ngOnInit();
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.searchControl.setValue('test');
    tick(DEBOUNCE_TIME);
    expect(dispatchSpy).toHaveBeenCalledWith(
      updateStationQuery({ value: 'test' }),
    );
  }));
});
