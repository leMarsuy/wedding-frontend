import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  L = L;
  map: any;
  @Input() longitude: number = 0;
  @Input() latitude: number = 0;

  tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false,
      center: [this.latitude, this.longitude],
      zoomControl: true,
      zoom: 16,
      maxZoom: 18,
      doubleClickZoom: true,
      scrollWheelZoom: false,
    });

    L.marker([this.latitude, this.longitude]).addTo(this.map);

    this.tileLayer.addTo(this.map);
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.latitude, this.longitude);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 0);
  }
}
