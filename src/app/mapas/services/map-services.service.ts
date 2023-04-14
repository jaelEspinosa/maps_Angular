import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapServicesService {

  constructor() { }

  setStyleMap(valor: string):string{
    if(valor === 'mapbox://styles/mapbox/streets-v12'){
      return valor = 'mapbox://styles/mapbox/satellite-streets-v12'

    }else{

     return valor = 'mapbox://styles/mapbox/streets-v12'
    }
}

}
