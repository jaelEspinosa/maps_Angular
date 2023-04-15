import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
      font-size:14px;
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
      right:10px;
      position:fixed;
      z-index:99999;
    }

    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map
  zoomLevel: number = 17
  mapStyle: string = 'mapbox://styles/mapbox/streets-v12'
  center:[number, number] = [-6.232614553781429, 36.59432074648235 ]

  constructor(private mapServices: MapServicesService ) {}

  ngOnDestroy(){
    // cuando el componente se destrulla elimino los eventlistener
    this.mapa.off('zoom', ()=>{})
    this.mapa.off('zoomend', ()=>{})
    this.mapa.off('move', ()=>{})

  }

  ngAfterViewInit() {
      this.mapa = new mapboxgl.Map({
        container: this.divMapa.nativeElement,
        style: this.mapStyle,
        center:this.center,
        zoom: this.zoomLevel
        });
      this.mapa.on('zoom', (ev)=>{
        this.zoomLevel= this.mapa.getZoom()
      })
      this.mapa.on('zoomend', (ev) =>{
        if(this.mapa.getZoom() > 19){
          this.mapa.zoomTo(19)
        }
        if(this.mapa.getZoom() < 1.5){
          this.mapa.zoomTo(1.5)
        }
      })
      this.mapa.on('move', (ev)=>{
         this.center = [this.mapa.getCenter().lng, this.mapa.getCenter().lat]


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
