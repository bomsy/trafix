import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SocketClient from 'socket.io-client';

import Beacon from './Beacon.js';

let io = SocketClient();

class Map extends Component {
  static propTypes = {
    location: React.PropTypes.array,
    onLocationChange: React.PropTypes.func,
    onMapLoaded: React.PropTypes.func
  };
  state = {
    center: {lat: 60.938043, lng: 30.337157 },
    zoom: 18,
    beacons: [] // traffic beacons updated in realtime from the server
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ center: nextProps.location });
  };

  handleMapLoaded = ({ map, maps }) => {
    if (this.props.onMapLoaded) {
      this.props.onMapLoaded({ map, maps });
    }
  };

  handleChange = ({ center, zoom , bounds }) => {
    this.setState({ center: center, zoom: zoom, bounds: bounds });
    if (this.props.onLocationChange) {
      this.props.onLocationChange(this.state.center, this.state.bounds);
    }
  };

  render() {
    const mapStyle = {
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '-10'
    }

    return (
      <div style={mapStyle}>
       <GoogleMapReact
        onGoogleApiLoaded={this.handleMapLoaded}
        yesIWantToUseGoogleMapApiInternals
        onChange={this.handleChange}
        center={this.state.center}
        zoom={this.state.zoom}>
        <Beacon lat={this.state.center.lat} lng={this.state.center.lng}></Beacon>
      </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
