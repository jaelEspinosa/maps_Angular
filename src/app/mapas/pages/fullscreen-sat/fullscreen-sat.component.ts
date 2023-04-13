import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fullscreen-sat',
  templateUrl: './fullscreen-sat.component.html',
  styles: [
    `
    #satellite{
      position: absolute;
      width: 100%;
      height: 100vh;
    }
    `]
})
export class FullscreenSatComponent implements OnInit{

  constructor(){}

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    var map = new mapboxgl.Map({
      container: 'satellite',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center:[-6.231155, 36.5943556],
      zoom:16

  });
  }
}
