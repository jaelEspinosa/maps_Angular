import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { FullscreenSatComponent } from './pages/fullscreen-sat/fullscreen-sat.component';



@NgModule({
  declarations: [
    MiniMapaComponent,
    FullscreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent,
    FullscreenSatComponent,

  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ],

})
export class MapasModule { }
