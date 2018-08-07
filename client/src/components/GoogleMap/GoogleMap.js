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
    zoom: 11
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
    return {
      nw: {
        lat: 50.01038826014866,
        lng: -118.6525866875
      },
      se: {
        lat: 32.698335045970396,
        lng: -92.0217273125
      }
    };
  }

  render() {
    const properties = this.props.properties || [];
    console.log(properties)
    const markers = properties.map((marker, index) => {
      return <Marker
        key={index}
        image={pad} 
        link={marker._id}
        text={marker.title}
        photo={marker.photos}
        lat={marker.latitude}
        lng={marker.longitude}
      onClick={() => this.markerGotClicked(marker._id)}
      isBoxVisible={marker._id === this.state.openMarker}
      />
    })

    // Important! Always set the container height explicitly
    const size = this.getSize();
    const bounds = this.getBounds();
    const {center, zoom} = fitBounds(bounds, size);

    return (

      <div className="map-div">
        <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDV-7_RPvHNoZ2-f-pM7XLdMMfYnVAMn5M',
              language: 'en',
              region: 'us', }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={center}
          zoom={zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}
