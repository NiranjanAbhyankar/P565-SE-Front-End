import React, { useState, useEffect} from "react";
import axios from "axios";

const fetchURL = "http://silo.soic.indiana.edu:29102/api/theaters";
// Passing title as props
function Theater_Info() {
  

  const [theater, setTheater] = useState({})


/*
    useEffect(() => {
    async function getTheatersFromApi() {
      try {
        let response = await fetch(url);
        let responseJson = await response.json();
        //setTheater(responseJson[0]);
        console.log(responseJson);

        return responseJson;
       } catch(error) {
         console.log("errororror");
        console.error(error);
      }
    }
  
    
    const PostData = getTheatersFromApi();
    console.log("AHHHHHHHH");
    console.log(PostData);
    });
    /*
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));*/
    useEffect(() => {
      // When the row appears on the screen, makes a request to show the movies
      // if [] => run once when the row loads, and dont run again
      async function fetchData() {
        const request = await axios.get(fetchURL);
        // "https://api.themoviedb.org/3/discover/tv?api-key=${API_KEY}&with_networks=213"
        setTheater(request.data[0]);
        console.log(request.data[0]);
        console.log(theater);
        // return request;
      }
      fetchData();
      // Any variable pulled outsited of useEffect scope has to go inside the [] at the end of the method
    }, [fetchURL]);
  


    
  return (
    <div>
        <h1>Theater Info</h1>
        <h2>Theater Name:</h2>
        {theater.name}
        <h2>Theater Address:</h2>
        {theater.address}
        <h2>Theater Hours:</h2>
        {theater.hours}
        <h2>Number of Rooms in Theater:</h2>
        {theater.numrooms}
        
    </div>
  )
}
export default Theater_Info;

