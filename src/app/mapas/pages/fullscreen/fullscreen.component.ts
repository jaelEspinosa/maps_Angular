import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { MapServicesService } from '../../services/map-services.service';




@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    .mapa{
      position: absolute;
      width: 100%;
      height: 100vh;
    }
    .satellite{
      width:100px;
      top: 36px;
      right:10px;
      position:fixed;
      z-index:99999;
    }
    `
  ]
})
export class FullscreenComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef

  map!:mapboxgl.Map;
  mapStyle:string = 'mapbox://styles/mapbox/streets-v12';
  constructor(private mapservices:MapServicesService) {}

  ngAfterViewInit(): void {

      this.map = new mapboxgl.Map({
        container: this.divMapa.nativeElement,
        style: this.mapStyle,
        center:[ -6.232614553781429, 36.59432074648235 ],
        zoom:17
    });

  }

  setStyleMap(){
  this.mapStyle = this.mapservices.setStyleMap(this.mapStyle)
   this.map.setStyle(this.mapStyle)


  }

}

