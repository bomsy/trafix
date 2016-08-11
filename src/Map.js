import './Map.css';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SocketClient from 'socket.io-client';
let io = SocketClient();
class Map extends Component {
  static propTypes = {
    location: React.PropTypes.array,
    onLocationChange: React.PropTypes.func,
    onMapLoaded: React.PropTypes.func
  };
  state = {
    center: [ 60.938043, 30.337157 ],
    zoom: 15,
  };

  componentDidMount() {
    this.setState({ center: this.state.center });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ center: nextProps.location });
  };

  handleMapLoaded = ({map, maps}) => {
    if (this.props.onMapLoaded) {
      this.props.onMapLoaded({map, maps});
    }
  };

  handleChange = ({center, zoom}) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
    if (this.props.onLocationChange) {
      this.props.onLocationChange(this.state.center);
    }
  };

  render() {
    const mapStyle = {
      width: '320px',
      height: '500px',
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
      </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
