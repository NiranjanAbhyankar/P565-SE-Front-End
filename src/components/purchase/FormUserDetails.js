import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class FormUserDetails extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
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
            <AppBar title="Enter User Details" />
    <h1>How many Tickets would you like to purchase for {values.title} at {values.theaterInfo.name}? </h1>
  

            <TextField
              placeholder="Enter your desired quantity of tickets"
              label="Tickets to Purchase"
              type="number"
              onChange={handleChange('firstName')}
              defaultValue={values.ticketQuantity}
              margin="normal"
              fullWidth
            />

            <br />
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

export default FormUserDetails;
