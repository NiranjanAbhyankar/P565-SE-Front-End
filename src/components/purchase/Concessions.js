import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText } from '@material-ui/core/';


export class Concessions extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter Personal Details" />
            <h3>This will provide a list of concessions available at the selected theater</h3>
            <List>
              <ListItem>
                <ListItemText primary={"Large Popcorn"} secondary="$5.00" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Large Soda " secondary="$10.00"/>
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
            >Continue</Button>
          </Dialog>
        </>
      </div>
    );
  }
}

export default Concessions;
