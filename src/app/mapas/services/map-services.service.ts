import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapServicesService {
 public geoPosition!:[number, number];

  constructor() { }

  setStyleMap(valor: string):string{
    if(valor === 'mapbox://styles/mapbox/streets-v12'){
      return valor = 'mapbox://styles/mapbox/satellite-streets-v12'

    }else{

     return valor = 'mapbox://styles/mapbox/streets-v12'
    }
}
getGeoLoc(): Observable<[number, number]> {
  return new Observable<[number, number]>(observer => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.geoPosition = [position.coords.longitude, position.coords.latitude];
        console.log('desde el servicio', this.geoPosition);
        observer.next(this.geoPosition);
        observer.complete();
      },
      error => {
        observer.error(error);
      }
    );
  });
}

}
