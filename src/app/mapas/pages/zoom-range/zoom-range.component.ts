import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapServicesService } from '../../services/map-services.service';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      position: absolute;
      width: 100%;
      height: 100vh;
    }

    .row{
      width:300px;
      background-color: white;
      bottom: 16px;
      left:50px;
      padding:10px;
      border-radius:8px;
      position:fixed;
      z-index:99999;
    }
    .satellite{
      width:100px;
      top: 36px;
      right:50px;
      position:fixed;
      z-index:99999;
    }

    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map
  zoomLevel: number = 17
  mapStyle: string = 'mapbox://styles/mapbox/streets-v12'
  constructor(private mapServices: MapServicesService ) {}

  ngAfterViewInit() {
      this.mapa = new mapboxgl.Map({
        container: this.divMapa.nativeElement,
        style: this.mapStyle,
        center:[ -6.232614553781429, 36.59432074648235 ],
        zoom: this.zoomLevel
        });
      this.mapa.on('zoom', (ev)=>{
        this.zoomLevel= this.mapa.getZoom()
      })
      this.mapa.on('zoomend', (ev) =>{
        if(this.mapa.getZoom() > 19){
          this.mapa.zoomTo(19)
        }
        if(this.mapa.getZoom() < 3){
          this.mapa.zoomTo(2.5)
        }
      })
  }


  zoomOut(){
      this.mapa.zoomOut();

  }
  setStyleMap(){
       this.mapStyle = this.mapServices.setStyleMap(this.mapStyle)
       this.mapa.setStyle(this.mapStyle)
  }

  zoomIn(){
      this.mapa.zoomIn();

  }
  zoomChanged(valor: string){
    this.mapa.zoomTo(Number(valor))
  }

}
