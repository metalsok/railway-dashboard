import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Station } from '../../models/station.interface';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle,
  ],
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss',
})
export class StationCardComponent {
  private router = inject(Router);

  @Input() station!: Station;

  navigateToDetails(detailId: string) {
    this.router.navigate(['/dashboard', detailId]);
  }
}
