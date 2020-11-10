import React, { useState, useEffect} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Geocode from "react-geocode";
import GoogleMaps from "../geocode.js"

const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
Geocode.setApiKey("AIzaSyB9LwVR4EdVtYVmT3uuibKaU56O7XmmE8M");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
// Passing title as props
function Theater_Info() {
  const [theater, setTheater] = useState({})
  const [state, setState] = useState({
    name: "",
    address: "",
    hours:"",
    concessions: [],
    numRooms:0
  })

  useEffect(() => {
      // When the row appears on the screen, makes a request to show the movies
      // if [] => run once when the row loads, and dont run again
      async function fetchData() {
        const request = await axios.get(fetchURL);
        setTheater(request.data[0]);
        console.log(request.data[0]);
        console.log(theater);

        // return request;
      }
      fetchData();
      setState(prevState =>{
        return {...prevState, name:theater.name, address:theater.address, concessions: theater.concessions, hours:theater.hours, numRooms:0}
      });
      // Any variable pulled outsited of useEffect scope has to go inside the [] at the end of the method
  }, [fetchURL]);
  
  Geocode.fromAddress("Eiffel Tower").then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      
    },
    error => {
      console.error(error);
    }
  );

    
  return (
    <div>
        <Typography>Theater Info</Typography>
        
        {//<TextField id="outlined-full-width" label={"Theater Name"} variant="outlined"  defaultValue= {state.name} />
}
        {theater.name}
        <Typography>Theater Address:</Typography>
        {theater.address}
        <Typography>Theater Hours:</Typography>
        {theater.hours}
        <Typography>Number of Rooms in Theater:</Typography>
        {theater.numrooms}
        <GoogleMaps latitude= "51.12345" longitude= "43.23456" />
        
    </div>
  )
}
export default Theater_Info;

