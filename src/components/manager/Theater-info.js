import React, { Component } from "react";
import axios from "axios";
// Passing title as props
export default class Theater_Info extends React.Component {
  
    
 render(){


    const url = "http://silo.soic.indiana.edu:29102/api/theaters";
    async function getTheatersFromApi() {
      try {
        let response = await fetch(url);
        let responseJson = await response.json();
        return responseJson;
       } catch(error) {
         console.log("errororror");
        console.error(error);
      }
    }
    
    const PostData = getTheatersFromApi();
    console.log("AHHHHHHHH");
    console.log(PostData);

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));


    
  return (
    <div>
        <h1>Theater Info</h1>
        {/*PostData.map((postDetail, index)=>{
            return <h2>{postDetail.name}</h2> }
        )*/ }
        
    </div>
  )}
}

