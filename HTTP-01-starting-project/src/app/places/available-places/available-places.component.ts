import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  fetching = signal(false);
  places = signal<Place[] | undefined>(undefined);
  errorMessage = signal('');

  ngOnInit(): void {
    this.fetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: places => this.places.set(places),
      error: (err: Error) => this.errorMessage.set(err.message),
      complete: () => this.fetching.set(false),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: resData => console.log(resData),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
