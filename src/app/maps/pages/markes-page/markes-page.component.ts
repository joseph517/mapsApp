import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker?: Marker
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markes-page.component.html',
  styleUrls: ['./markes-page.component.css']
})
export class MarkesPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;
  
  public markers : MarkerAndColor[] = []
  
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
    this.readFromLocalStorage()
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

    this.markers.push({
      color,
      marker
    })

    this.saveToLocalStorage()

    marker.on('dragend', () => {

      this.saveToLocalStorage()
      
    })
  }

  deleteMarker( i : number ){
    this.markers[i].marker?.remove()
    this.markers.splice(i, 1)
  }

  flyTo( marker : Marker ){
    if(!this.map) throw 'Mapa no inicializado'
    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(  ){

    const plainMarkers : PlainMarker[] = this.markers.map( ({color, marker}) => {

      return {
        color,
        lngLat: marker!.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers)) 
    
  }

  readFromLocalStorage(){

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'
    const plainMarkers : PlainMarker[] = JSON.parse(plainMarkersString)
    console.log(plainMarkers);

    plainMarkers.forEach( ({color, lngLat}) => {
      const [ lng, Lat ] = lngLat
      const coords = new LngLat(lng, Lat)

      this.addMarker(coords, color)
    })

  }

}
