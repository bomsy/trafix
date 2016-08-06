import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

class Search extends Component {
  static propTypes = {
    onPlaceChanged: React.PropTypes.func,
    onPlacesChanged: React.PropTypes.func,
    map: React.PropTypes.object
  };

  handlePlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  handlePlaceChanged = () => {
    if (this.props.onPlaceChanged) {
      this.props.onPlaceChanged(this.autocomplete.getPlace());
    }
  };

  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.locsearch);
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('text-field-search'));
    this.searchBox = new google.maps.places.SearchBox(this.input);
    //this.autocomplete.bindTo('bounds', this.props.map);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    this.searchBox.addListener('places_changed', this.handlePlacesChanged);
  };

  componentWillUnmount() {
    //this.autocomplete.removeListener('place_changed', this.handlePlaceChanged);
    //this.searchBox.removeListener('places_changed', this.handlePlacesChanged);
  };

  render() {
    const searchTextFieldStyle = {
      backgroundColor: '#fff',
      //marginTop: '10px',
      //height: '35px',
      fontSize: '12px',
      paddingLeft: '10px',
      paddingRight: '10px',
      color: '#888',
      borderRadius: '3px',
      border: '1px solid #ccc'
    };

    return (
      <TextField
        placeholder="Search Location"
        ref="locsearch"
        type="search"
        id="text-field-search"
        fullWidth={true}
        inputStyle={searchTextFieldStyle}
        hintText="Search Location"
        underlineShow={false}/>
    );
  }
};

export default Search;
