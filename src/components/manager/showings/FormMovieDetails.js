import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Showings from './showings';
import Typography from '@material-ui/core/Typography';

export class FormMovieDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render() {
    const { values, handleChange, handleMovieChange } = this.props;
    const createShowing = tmdbid => {
      console.log("create showing");

      handleMovieChange(tmdbid);
      this.props.nextStep();

      
    }
    return (
      <MuiThemeProvider>
        <>

            
            <AppBar title="Enter Personal Details" />
            <Typography>Choose a Movie to Add A Showing For:</Typography>
            <Showings createShowing = {createShowing} />


        </>
      </MuiThemeProvider>
    );
  }
}

export default FormMovieDetails;
