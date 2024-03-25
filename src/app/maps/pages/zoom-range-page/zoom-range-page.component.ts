import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Map, LngLat } from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map
  public currentLngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'; 
    
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.currentLngLat,
      zoom: this.zoom
    });

    this.mapListener()
    
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListener(){
    if(!this.map) throw 'Mapa no inicializado' 
    
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom()
    })

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() > 18) {
        this.map!.zoomTo(18)
      }
    })

    this.map.on('move', () => {

      this.currentLngLat = this.map!.getCenter()
      console.log(this.map!.getCenter());
 
    })
    
  }

  zoomIn(){
    this.map?.zoomIn()
  }
  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChanged( value: string ){
    // this.map?.zoomTo(Number(value))
    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom)
  }


  

}
