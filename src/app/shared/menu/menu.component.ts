import { Component } from '@angular/core';


interface MenuItem{
  ruta: string;
  nombre: string;

}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      ruta: 'mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: 'mapas/zoom-range',
      nombre: 'Zoom Range'
    },{
      ruta: 'mapas/marcadores',
      nombre: 'Marcadores'
    },

  ]
}
