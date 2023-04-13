import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { FullscreenSatComponent } from './pages/fullscreen-sat/fullscreen-sat.component';

const routes: Routes = [
{
  path:'',
  children:[
    {path:'fullscreen', component: FullscreenComponent },
    {path:'satellite', component: FullscreenSatComponent },
    {path:'zoom-range', component: ZoomRangeComponent },
    {path:'marcadores', component: MarcadoresComponent },
    {path:'propiedades', component: PropiedadesComponent },
    {path:'**', redirectTo:'fullscreen'}
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
