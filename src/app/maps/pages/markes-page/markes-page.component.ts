import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';


@Component({
  templateUrl: './markes-page.component.html',
  styleUrls: ['./markes-page.component.css']
})
export class MarkesPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);

   
  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'; 
    
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.currentLngLat,
      zoom: 14
    });
  }

  createMarker(){
    if(!this.map) throw 'Mapa no inicializado'

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color)
    
  }

  addMarker( lngLat : LngLat, color : string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)
    
  }

}
