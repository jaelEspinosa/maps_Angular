import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapServicesService } from '../../services/map-services.service';
import * as mapboxgl from 'mapbox-gl';



interface MarkerWidthColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?:[number, number];

}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      position: absolute;
      width: 100%;
      height: 100vh;
    }

    .satellite{
      width:100px;
      top: 22px;
      left:150px;
      position:fixed;
      z-index:99999;
    }
    .satellite2{
      width:120px;
      cursor:pointer;
      padding:5px;
      border-radius:8px;
      text-align:center;
      position:fixed;
      top:76px;
      right:5px;
      z-index:99999;
    }
    .satellite3{
      width:100px;
      top: 22px;
      left:255px;
      position:fixed;
      z-index:99999;
    }
    `
  ]
})



export class MarcadoresComponent implements AfterViewInit {

  constructor(private mapServices: MapServicesService ) {}




  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map
  zoomLevel: number = 17
  mapStyle: string = 'mapbox://styles/mapbox/streets-v12'
  center:[number, number] = [-3.688299916528383, 40.453153956866586 ]

  // array of markers

  markers: MarkerWidthColor[] = []

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: this.mapStyle,
      center:this.center,
      zoom: this.zoomLevel
      });

      this.getMarkersLocalStorage()

      this.mapa.on('move', (ev)=>{
        this.center = [this.mapa.getCenter().lng, this.mapa.getCenter().lat]
     })
    }


  setStyleMap(){
    this.mapStyle = this.mapServices.setStyleMap(this.mapStyle)
    this.mapa.setStyle(this.mapStyle)
   }

  goMarker(marker:mapboxgl.Marker){


     this.mapa.flyTo({
      center:marker.getLngLat()
     })
  }

  addMarker(){
     const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
     const newMarker = new mapboxgl.Marker({
      draggable:true,
      color
     })
       .setLngLat( this. center)
       .addTo(this.mapa);

    this.markers = [...this.markers, {marker: newMarker, color}]

    this.saveMarkerLocalStorage()

    newMarker.on('dragend',()=>{
      this.saveMarkerLocalStorage()
    })
  }

  saveMarkerLocalStorage() {

    const markersLocalStorage: MarkerWidthColor[] =[]

    this.markers.forEach(m =>{
          const color = m.color;
          const {lng, lat} = m.marker!.getLngLat()

          markersLocalStorage.push({color, centro:[lng, lat]})
    })

   localStorage.setItem('markers', JSON.stringify(markersLocalStorage))
}

  getMarkersLocalStorage() {
    if (!localStorage.getItem('markers')) return

    const markersLocalStorage: MarkerWidthColor[] = JSON.parse(localStorage.getItem('markers')!);


    markersLocalStorage.forEach(m=>{
      const newMarker = new mapboxgl.Marker({
        draggable:true,
        color: m.color
      })
           .setLngLat(m.centro!)
           .addTo(this.mapa)

           this.markers.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', ()=>{
        this.saveMarkerLocalStorage()
      })
    });
  }

deleteMarker(index: number){

  this.markers[index].marker?.remove()
  this.markers.splice(index, 1)
  this.saveMarkerLocalStorage()
}


myPosition(){

  this.mapServices.getGeoLoc()
  .subscribe(position => {
   this.mapa.flyTo({
    center:position
   })
   const newMarker = new mapboxgl.Marker({
    draggable:true,
   })
     .setLngLat(position)
     .addTo(this.mapa)

   const popup = new mapboxgl.Popup({ closeOnClick: false })
     .setLngLat(position)
     .setHTML(`
            <div style="
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width:125px;
                    ">
                <h5>Tu posición</h5>
            </div>
            `
            )
     .addTo(this.mapa);
   })


}

}
