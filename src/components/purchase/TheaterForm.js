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

const GOOGLE_MAP_API_KEY = 'AIzaSyB9LwVR4EdVtYVmT3uuibKaU56O7XmmE8M';

const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}




export class TheaterForm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  getEligibleTheaterIds = (values) => {
    var eligibleTheaters = [];
    console.log({
        movie: values.movie,
        availableShowings: values.availableShowings
    })
    values.availableShowings.map( (showing) => {if (showing.movie == parseInt(values.movie.tmdbid)) eligibleTheaters.push(showing.id) });
    console.log({eligibLETHEATERS: eligibleTheaters})
    return eligibleTheaters;
  }
  

  render() {


    const { values, handleChange } = this.props;

    const eligibleTheaterIds = this.getEligibleTheaterIds(values);
    console.log({eligibleTheaterIDs: eligibleTheaterIds})
    const eligibleTheaters = [];
    values.availableTheaters.map((theater) => {if (eligibleTheaterIds.includes(theater.id)) eligibleTheaters.push(theater)})
    
    return (
      <div>
        <>

            <AppBar title="Enter User Details" />
            <h1>What theater would you like to view {values.movie.name} at? </h1>
  
           <br/>
             <FormControl variant="filled"style={{minWidth: 120}} className={"salad"/*classes.formControl*/}>
                <InputLabel id="demo-simple-select-filled-label">Selected Theater</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={handleChange('theaterInfo')}
                >


                {eligibleTheaters.map( (theater) => 
                    <MenuItem value = {theater}>{theater.name}</MenuItem>)}

                </Select>
            </FormControl>

            <br /><br/>
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Next</Button>
            <GMap/>
            
        </>
      </div>
    );
  }
}

export default TheaterForm;