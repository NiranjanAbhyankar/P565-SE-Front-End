import React, { useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBox from "../Search/search-box.js";
import axios from "axios";
import  Dropdown  from "./dropdown";
import DropdownLocation from "./dropdownLocation"
import CheckboxGenre from "./checkboxGenre"
import "../../index.css"

function Filters({selectDropDown, selectLocation}){

  const [state, setState] = useState({
    s: "",
    movies: [],
    selected: undefined});
  const [results, setResults] = useState([]);

  const genres = ["Action", "Adventure", "Horror", "Comedy", "Sci-Fi", "Fantasy", "Mystery", "Historical"]
  //    action: false, adventure: false, horror: false, comedy: false, "Sci-Fi", "Fantasy", "Mystery", "Historical"});

  const [theaters, setTheaters] = useState([]);



  useEffect(() => {
   // When the row appears on the screen, makes a request to show the movies
   // if [] => run once when the row loads, and dont run again
   async function fetchData() {
     const request = await axios.get("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters");

     setTheaters(request.data);

   }
   fetchData();
 }, ["https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters"]);

  const getTheaters = () => {

  }
  const search = (e) =>{
    if(e.key ==="Enter"){
      axios( "&query=" + state.s).then((data)=>{
        this.setState(prevState =>{
          console.log(data.data.results)
          return {...prevState, movies:data.data.results}
        }) 
      })
    }
  }



      return (
        <div class = "filt">
            {/*genres.map((genre) => <p>{genre}</p>)*/}
            {/*<CheckboxGenre></CheckboxGenre>*/}
           <Dropdown theaters= {theaters} selectDropDown = {selectDropDown} ></Dropdown>
           <DropdownLocation selectLocation = {selectLocation}></DropdownLocation>


        </div>
      )
    }
  

  export default Filters;
