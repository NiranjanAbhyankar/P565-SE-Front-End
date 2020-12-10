import React, { Component, useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GMap from "../Maps/Map"
export class ShowingsForm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  // take given theater
  // take given movie
  // show available times/dates
  getShowing(showing, selectedTheaterID){
    if(showing.theater == selectedTheaterID){
      console.log(showing.datetime)
      return ( <MenuItem value = {showing}>{this.parseTime(showing.datetime)}</MenuItem>)
    }
  }

  parseTime(time){
   var timesArr= time.split("T")
   return timesArr[0] + "," + timesArr[1]
   
  }
  render() {
    const { values, handleChange } = this.props;
    return(
    <div>
          <AppBar title="Select a Showing" />
          <h1>What time would you like to view {values.movie.name} at {values.theaterInfo.name}? </h1>


           <FormControl variant="filled" style={{minWidth: 120}} className={"salad"/*classes.formControl*/}>
              <InputLabel id="demo-simple-select-filled-label">Selected Showing</InputLabel>
              <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange('selectedShowing')}
              >


              {values.availableShowings.map( (showing) => 
                  this.getShowing(showing, values.theaterInfo.id))}
                  {console.log({availableSHOWINGS: values.availableShowings,
                                SELECTED_tHEATER: values.theaterInfo.id})}

              </Select>
          </FormControl>

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
          >Next</Button>
          
      
    </div>
    )
  }
}
  export default ShowingsForm