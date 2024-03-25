import { Component } from '@angular/core';

export interface MenuItem {
  name: string;
  route: string;
}
@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public MenuItem: MenuItem[] = [
    {
      name: 'FullScreen',
      route: '/maps/fullscreen'
    },
    {
      name: 'ZoomRange',
      route: '/maps/zoom-range'
    },
    {
      name: 'Markers',
      route: '/maps/markers'
    },
    {
      name: 'Houses',
      route: '/maps/properties'
    }
  ]

}
