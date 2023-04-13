import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #mapa{
      position: absolute;
      width: 100%;
      height: 100vh;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {

    (mapboxgl as any).accessToken = environment.mapboxToken;
  var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v12',
    center:[-6.2310414, 36.5943686],
    zoom:16
});

  }

}
/* 36.5943686,-6.2310414 */
