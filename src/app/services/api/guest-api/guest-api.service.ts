import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuestApiService {
  URL = 'http://localhost:3002/api/v1/';

  constructor(private httpClient: HttpClient) {}

  getGuests() {
    return this.httpClient.get(this.URL + 'guests');
  }

  addGuest(name: string, allowedPlusses: number) {
    return this.httpClient.post(this.URL + 'guests', { name, allowedPlusses });
  }

  editGuest(id: string, name: string, allowedPlusses: number) {
    return this.httpClient.post(this.URL + 'guests/' + id, {
      name,
      allowedPlusses,
    });
  }

  deleteGuest(id: string) {
    return this.httpClient.delete(this.URL + 'guests/' + id);
  }

  searchGuestByName(name: string) {
    return this.httpClient.get(this.URL + 'guests/search/' + name);
  }

  getGuestStats() {
    return this.httpClient.get(this.URL + 'guests/stats');
  }

  rsvp(
    id: string,
    plusses: Array<any>,
    isAttending: string,
    email: string,
    mobileNumber: string,
    notes: string
  ) {
    return this.httpClient.post(this.URL + 'guests/rsvp/' + id, {
      plusses,
      isAttending,
      email,
      mobileNumber,
      notes,
    });
  }
}
