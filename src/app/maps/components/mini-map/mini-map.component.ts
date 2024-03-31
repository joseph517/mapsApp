import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number]
  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void {

    if (!this.divMap?.nativeElement) throw 'El elemento HTML no fue encontrado';
    if (!this.lngLat) throw 'El elemento HTML no fue encontrado'; 
    
    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
  }

}
