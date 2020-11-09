import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    
    var array = [{
      "id": 0,
      "theater": 0,
      "room": this.props.values.room,
      "datetime": this.props.values.time + ":00",
      "duration": this.props.values.duration,
      "movie": this.props.values.tmdbid
    }];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/showings", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(array));

    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { tmdbid, time, room, duration}
    } = this.props;
    return (
      <MuiThemeProvider>
        <>

            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="Movie ID" secondary={tmdbid} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time" secondary={time} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Duration" secondary={duration} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Room" secondary={room} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirm & Continue</Button>

        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
