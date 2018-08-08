import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import pad from './pad.svg';
import Marker from '../Marker/Marker.js';
import 'bulma/css/bulma.css';
import "./GoogleMap.css";

export class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.8716,
      lng: -122.2727
    },
    zoom: 100
  };

  state = {

  };


  markerGotClicked = (link) => {

    if (link === this.state.openMarker) {
      // this is already open
      this.setState({
        openMarker: null,
      });
    } else {
      // OTHERWISE, we want this one to be open
      this.setState({
        openMarker: link,
      });
    }
  }

  getSize() {
    return {
      width: 640, // Map width in pixels
      height: 380, // Map height in pixels
    };
  }

  getBounds() {
    if (!this.props.properties || this.props.properties.length < 1) {
      return null;
    }
    const latitudes = this.props.properties.map(x => Number(x.latitude))
    const longitudes = this.props.properties.map(x => Number(x.longitude))

    const highestLatitude = Math.max(...latitudes)
    const highestLongitude = Math.max(...longitudes)
    const lowestLatitude = Math.min(...latitudes)
    const lowestLongitude = Math.min(...longitudes)

    // console.log(`NW: lat:${highestLatitude} lng${lowestLongitude}`)
    // console.log(`SE: lat:${lowestLatitude} lng:${highestLongitude}`)

    return {
      nw: {
        lat: highestLatitude,
        lng: lowestLongitude,
      },
      se: {
        lat: lowestLatitude,
        lng: highestLongitude,
      }
    };
  }

  render() {
    const properties = this.props.properties || [];
    const markers = properties.map((marker, index) => {
      return <Marker
        key={index}
        link={marker._id}
        text={marker.title}
        image={marker.photos}
        lat={marker.latitude}
        lng={marker.longitude}
        markerImage={pad}
        onClick={() => this.markerGotClicked(marker._id)}
        isBoxVisible={marker._id === this.state.openMarker}
      />
    })

    const size = this.getSize();
    const bounds = this.getBounds();
    let center = { lat: 37.432335, lng: -121.899574 };
    let zoom = 10;
    if (bounds) {
      ({ center, zoom } = fitBounds(bounds, size));
    }
    if("Hello World"){
      console.log('this is center and zoom', { center, zoom });
    }
    return (

      <div className="map-div">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDV-7_RPvHNoZ2-f-pM7XLdMMfYnVAMn5M',
            language: 'en',
            region: 'us',
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={{ lat: 37.432335, lng: -121.899574 }}
          zoom={zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}
