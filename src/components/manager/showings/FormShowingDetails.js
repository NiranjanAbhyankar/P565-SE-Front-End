import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import clsx from 'clsx';

export class FormShowingDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
      + "/" + currentdate.getFullYear() + " @ " 
      + currentdate.getHours() + ":" 
      + currentdate.getMinutes() + ":" + currentdate.getSeconds();  
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter Showing Details" />
            <TextField
              id="datetime-local"
              label="Showing Start Time"
              type="datetime-local"
              defaultValue="2020-11-04T10:30:00"
              onChange={handleChange('time')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <FormControl >
            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
              <Input
                id="standard-adornment-weight"
                value={values.duration}
                onChange={handleChange('duration')}
                endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'duration',
                }}
              />

            </FormControl>
            <br/>
            <FormControl >
              <InputLabel id="demo-simple-select-label">Room Number</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue="1"
                onChange={handleChange('room')}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <br/>
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormShowingDetails;
