import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {catchError, map, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching places, please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favourite places, please try again later.'
    ).pipe(
      tap({next: userPlaces => this.userPlaces.set(userPlaces)})
    );
  }

  addPlaceToUserPlaces(place: Place) {
    // Optimistic update
    // const prevPlaces = this.userPlaces();
    // if (!prevPlaces.some(p => p.id === place.id)) { // only add if does not exist
    //   this.userPlaces.set([...prevPlaces, place]);
    // }

    return this.httpClient.put<{ userPlaces: Place[] }>('http://localhost:3000/user-places', {placeId: place.id})
      .pipe(
        tap(body => {
          // only add if does not exist
          if (!this.userPlaces().some(p => p.id === place.id)) {
            this.userPlaces.set(body.userPlaces);
          }
        }),
        catchError(() => {
          // this.userPlaces.set(prevPlaces); // rollback
          this.errorService.showError('Failed to add place');
          return throwError(() => new Error('Failed to add place'));
        }),
      );
  }

  removeUserPlace(place: Place) {
    // Optimistic update
    const prevPlaces = this.userPlaces();
    // if (prevPlaces.some(p => p.id == place.id)) {
    //   this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id));
    // }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        tap(() => {
          // Update userPlaces only after successful deletion
          const updatedPlaces = this.userPlaces().filter(p => p.id !== place.id);
          this.userPlaces.set(updatedPlaces);
        }),
        catchError(() => {
          // this.userPlaces.set(prevPlaces); // rollback
          this.errorService.showError('Failed to add place');
          return throwError(() => new Error('Failed to add place'));
        }),
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map(resData => resData.places),
      catchError(err => {
        console.log(err);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

}
