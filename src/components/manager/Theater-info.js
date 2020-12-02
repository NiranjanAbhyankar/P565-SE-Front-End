import React, { useState, useEffect} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Geocode from "react-geocode";
import Map from "../Maps/Map"



const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
Geocode.setApiKey("AIzaSyB9LwVR4EdVtYVmT3uuibKaU56O7XmmE8M");

let lat=0,lng=0;
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
  
  Geocode.fromAddress(theater.address).then(
    response => {
      const {lat,lng} = response.results[0].geometry.location;
      
      // global.latlong[0]=response.results[0].geometry.location.lat();
      // global.latlong[1]=response.results[0].geometry.location.lng();      
    },
    error => {
      console.error(error);
      console.log("Chukicha format ahe re")
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
        <Map {...{latitude:40.7128, longitude:-74.225}}/> 
    </div>
  )
}
export default Theater_Info;

