import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Beacon extends Component {
  static propTypes = {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
  };

  render() {
    const beaconStyle = {
      border: '1px solid #f44336',
      backgroundColor: '#fccbc8',
      borderRadius: '50%',
      width: '15px',
      height: '15px',
      opacity: '0.5 '
    };
    return ( <div style={beaconStyle}></div> );
  }
}

export default Beacon;
