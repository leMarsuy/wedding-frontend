import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeddingApiService {
  URL = 'https://wedding-backend-z9m9i.ondigitalocean.app/api/v1';
  // URL = 'http://localhost:3002/api/v1/';

  constructor(private httpClient: HttpClient) {}

  getWeddingDate() {
    return this.httpClient.get(this.URL + 'wedding/wedding-date/');
  }
}
