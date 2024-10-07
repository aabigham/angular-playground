import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesComponent} from '../places.component';
import {Place} from "../place.model";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);

  fetching = signal(false);
  places = this.placesService.loadedUserPlaces;
  errorMessage = signal('');

  ngOnInit(): void {
    this.fetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      error: (err: Error) => this.errorMessage.set(err.message),
      complete: () => this.fetching.set(false),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe()); // Optional
  }

  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      next: resData => console.log(resData),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe()); // Optional
  }
}
