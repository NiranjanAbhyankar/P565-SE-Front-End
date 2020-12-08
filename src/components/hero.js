import React, { useState, useEffect } from "react";
import axios from "../axios"
import "../App.js";
import "../index.css"
import Banner from "./banner/Banner";
import { Container } from "react-bootstrap";
import requests from "../requests";
import Row from "./row/Row";
import Filters from "./Search_Filters/filters";
import {Button} from "@material-ui/core/"
import Search from "./manager/Search"

const Hero = (props) => {
  const furl = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/movies";

  // filters currently applied to displayed movies
  const [currentFilters, setFilters] = useState({
    title: "",
    selectedTheater: -1,
    selectedLocation: -1,
    genre: []});

  // filters selected but not yet applied
  const [tempFilters, setTempFilters] = useState({
    title: "",
    selectedTheater: -1,
    selectedLocation: -1,
    genre: []});
    const [movies, setMovies] = useState([]);
    const[showings, setShowings] = useState([]);


    
   useEffect(() => {
    async function fetchData() {
      const request1 = await axios.get(furl);
      setMovies(request1.data);

      const request2 = await axios.get("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/showings");
      setShowings(request2.data);
      console.log({selectmovieHERO: props.selectMovieApp})

    }
    fetchData();
  }, [furl]);
  
  // search hit -enter functionality
  const search = (e) =>{
    if(e.key ==="Enter"){
      const currentString = tempFilters.title;
      console.log("searched for something")
      setFilters(prevState =>{
        return {...prevState, title:currentString}
      });
      //console.log(currentFilters)

    }
  }

  // searchbar onType functionality
  const handleInput = (e) => {
    let s = e.target.value;
   // console.log({CurrentInput: s});
    setTempFilters(prevState =>{
      return {...prevState, title:s}
    });
  }

  // selected Theater stores the id of a theater, or -1 to signify no theater is selected
  const selectTheater = (theater) => {
    setTempFilters(prevState =>{
      return {...prevState, selectedTheater:theater}
    });
    //console.log(tempFilters);
  }
  const selectLocation = (location) => {
    console.log('changing locations')
    console.log(location);
    setTempFilters(prevState =>{
      return {...prevState, selectedLocation:location}
    });
    //console.log(tempFilters);
  }



  const resetFilters = () => {
    // do something to reset filters
  }
  const applyFilters = () => {
    console.log(tempFilters)
    console.log(currentFilters)

    setFilters(prevState =>{
      return {
        title: tempFilters.title,
        selectedTheater: tempFilters.selectedTheater,
        selectedLocation: tempFilters.selectedLocation,
        genre: tempFilters.genre}
    });
  }
  return (
    <Container  >
      <div class="filters">
        <Search handleInput ={handleInput} search = {search}></Search>
        <h3>Filters</h3>
        <hr></hr>
        <Filters handleInput = {applyFilters} selectDropDown={selectTheater} selectLocation={selectLocation}></Filters>
        <Button variant="contained" color="primary" onClick={applyFilters}> Apply Filters </Button>
      </div>
      
      <div class="rowStuff">
      <Banner />
      <Row selectMovieApp = {props.selectMovieApp}title="Available at our Theaters" movies={movies} filters = {currentFilters} showings={showings} fetchURL= {furl} isLargeRow/>
     {/* <Row title="Family Movies" fetchURL={requests.fetchFamily} isLargeRow />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} isLargeRow/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} isLargeRow/>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} isLargeRow/>
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} isLargeRow/>
  */}
  </div>
      
      
    </Container>
  );
}

export default Hero;
