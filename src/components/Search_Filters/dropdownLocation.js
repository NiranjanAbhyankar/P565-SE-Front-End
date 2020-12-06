import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DropdownLocation({selectLocation}){
    const classes = useStyles();
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);




    const handleChange = (event) => {
      console.log({CHANGEDLOCATION: event.target.value})
      setLocation(event.target.value);
      selectLocation(event.target.value);
      //  console.log(event.target.value)
    };

    
  useEffect(() => {
    // When the row appears on the screen, makes a request to show the movies
    // if [] => run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters");
 
      let myLocations = new Set();
      request.data.map((theater) => myLocations.add(theater.city));
      console.log(Array.from)

      setLocations(Array.from(myLocations))
 
 
    }
    fetchData();
  }, ["https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters"]);


      return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Selected Location</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={location}
                    onChange={handleChange}
                >

                <MenuItem value="-1">All</MenuItem>
                {locations.map( (loc) => <MenuItem value= {loc}>{loc}</MenuItem>) }


                </Select>
            </FormControl>
        </div>
      )
    }
  

  export default DropdownLocation;
