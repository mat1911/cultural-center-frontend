import { Component, Input, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

import {Point} from 'ol/geom';
import Feature from 'ol/Feature';

import {Style, Stroke, Circle} from 'ol/style';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() latitude: number;
  @Input() longtitude: number;

  map: Map;

  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.longtitude, this.latitude]),
        zoom: 18
      })
    });

    const pointFeature = this.createMarker();

    const layer: VectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [pointFeature]
      })
    })

    this.map.addLayer(layer);
  }


  private createMarker(): Feature{
    const myStyle: Style = new Style({
      image: new Circle({
        radius: 25,
        stroke: new Stroke({
          color: [255,0,0], width: 3
        }),
      })
    })

    const pointFeature: Feature = new Feature({
      geometry: new Point(olProj.fromLonLat([this.longtitude, this.latitude])),
    });

    pointFeature.setStyle(myStyle);

    return pointFeature;
  }
}
