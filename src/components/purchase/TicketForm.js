import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class TicketForm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    console.log(values)
    return (
      <div>
        <>

            <AppBar title="Enter User Details" />
    <h1>How many Tickets would you like to purchase for {values.movie.name} at {values.theaterInfo.name} at ? </h1>
  

            <TextField
              placeholder="Enter your desired quantity of tickets"
              label="Tickets to Purchase"
              type="number"
              onChange={handleChange('ticketQuantity')}
              defaultValue={values.ticketQuantity}
              margin="normal"
  
              
            />

            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
        </>
      </div>
    );
  }
}

export default TicketForm;
