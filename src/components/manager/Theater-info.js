import React, { useState, useEffect} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Geocode from "react-geocode";



const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";

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
  
  
    
  return (
    <div>
        <Typography variant="h5">Theater Info</Typography>
        
        {//<TextField id="outlined-full-width" label={"Theater Name"} variant="outlined"  defaultValue= {state.name} />
}
        {theater.name}
        <Typography variant="h5">Theater Address:</Typography>
        {theater.address}
        <Typography variant="h5">Theater Hours:</Typography>
        {theater.hours}
        <Typography variant="h5">Number of Rooms in Theater:</Typography>
        {theater.numrooms}
    </div>
  )
}
export default Theater_Info;

