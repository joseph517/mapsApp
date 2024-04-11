import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


export interface MenuItem {
  name: string;
  route: string;
}
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'side-menu',
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
    },
    {
      name: 'Alone',
      route: '/alone'
    }
  ]

}
