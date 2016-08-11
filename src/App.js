import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import Map from './Map.js';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

class App extends Component {
  state = {
    openMenu: false,
    showSearch: false,
    location: [60.938043, 30.337157],
    map: null
  }

  handleToggleMenu = () => {
    this.setState({ openMenu: !this.state.openMenu });
  };

  handleToggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  handleCurrentPosition = (pos) => {
    this.setState({ location: [pos.coords.latitude, pos.coords.longitude] });
  };

  handleMapLoaded = ({map, maps}) => {
    this.setState({ map: map });
  };

  handlePlaceChanged = (place) => {
    let location = place.geometry.location;
    this.setState({ location: [location.lat(), location.lng()] });
    this.handleToggleSearch();
  };

  showSearch = () => {
    this.handleToggleMenu();
    this.handleToggleSearch();
  };

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log('browser does not support!');
      return;
    }
    navigator.geolocation.getCurrentPosition(this.handleCurrentPosition);
  };

  render() {
    const iconStyle = {
      fontSize: '36px',
      paddingLeft: '40px'
    };

    const appIconStyle = {
      fontSize: '48px',
      paddingTop: '8px',
      color: '#fff'
    };

    const listIconStyle = {
      fontSize: '24px'
    };

    const listItemStyle = {
      fontSize: '13px',
      float: 'left',
      width: '100%'
    }

    const dialogStyle = {
      padding: '0px'
    }

    const listItemInnerDivStyle = {
      float: 'left'
    }

    const textFieldStyle = {
      backgroundColor: '#fff',
      marginTop: '10px',
      height: '35px',
      fontSize: '12px',
      paddingLeft: '10px',
      paddingRight: '10px',
      color: '#888',
      borderRadius: '4px'
    };

    const titleStyle = {
      float: 'left',
      borderRadius: '3px'
    }

    const drawerStyle = {
      marginTop: '64px',
      width: '200px',
      opacity: '0.9'
    }

    return (
      <div className="App">
        <AppBar
          titleStyle={titleStyle}
          title={<FontIcon style={appIconStyle} className="material-icons">bubble_chart</FontIcon>}
          iconElementLeft={
            <IconButton onClick={this.handleToggleMenu}>
              <FontIcon style={iconStyle} className="material-icons">menu</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <IconButton onClick={this.handleToggleSearch}>
              <FontIcon style={iconStyle} className="material-icons">location_searching</FontIcon>
            </IconButton>
          }>
          </AppBar>
        <Map location={this.state.location} onMapLoaded={this.handleMapLoaded} />
        <Drawer containerStyle={drawerStyle} open={this.state.openMenu}>
          <List>
              <ListItem
                style={listItemStyle}
                innerDivStyle={listItemInnerDivStyle}
                primaryText="Search Location"
                onClick={this.showSearch}
                leftIcon={<FontIcon style={listIconStyle} className="material-icons">location_searching</FontIcon>} />
              <ListItem
                style={listItemStyle}
                innerDivStyle={listItemInnerDivStyle}
                primaryText="Alternative Route" leftIcon={<FontIcon style={listIconStyle}
                className="material-icons">swap_vert</FontIcon>} />
          </List>
          <Divider />
          <List>
              <ListItem
                style={listItemStyle}
                innerDivStyle={listItemInnerDivStyle}
                primaryText="Settings"
                leftIcon={<FontIcon style={listIconStyle} className="material-icons">settings</FontIcon>}  />
              <ListItem
                style={listItemStyle}
                innerDivStyle={listItemInnerDivStyle}
                primaryText="About"
                leftIcon={<FontIcon style={listIconStyle} className="material-icons">info</FontIcon>} />
          </List>
        </Drawer>
        <Dialog
          bodyStyle={dialogStyle}
          onRequestClose={this.handleToggleSearch}
          open={this.state.showSearch}>
          <Search map={this.state.map} onPlaceChanged={this.handlePlaceChanged}/>
        </Dialog>
        <Toolbar className="Toolbar">
        <TextField id="text-field-comment" hintText="dfaksdlfkasd" fullWidth={true} inputStyle={textFieldStyle} underlineShow={false}/>
        <ToolbarGroup>
            <FontIcon  style={iconStyle} className="material-icons">sentiment_satisfied</FontIcon>
        </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default App;
