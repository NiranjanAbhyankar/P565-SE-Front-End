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
import Typography from '@material-ui/core/Typography';

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

            <AppBar title="Enter Showing Details" />
            <Typography>Enter Showing Details</Typography>
            <TextField
              id="datetime-local"
              label="Showing Start Time"
              type="datetime-local"
              defaultValue={datetime}
              onChange={handleChange('time')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br /> <br />
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
            <br/> <br />
            <FormControl >
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                width="1000"
                id="demo-simple-select"
                defaultValue="1"
                onChange={handleChange('room')}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <br/> <br />
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            <br /><br/> 
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>

        </>
      </MuiThemeProvider>
    );
  }
}

export default FormShowingDetails;
