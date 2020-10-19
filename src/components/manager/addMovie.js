import React, { Component } from "react";
import SearchBox from "../Search/search-box.js";
//import Row from "../row/SearchRow";
export default class AddShowing extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A showing was added: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
          //https://api.themoviedb.org/3/search/movie?api_key=d73ffca3a2d08b6870b16763c14c058b&query=batman
        const url = "https://api.themoviedb.org/3/search/movie?api_key=d73ffca3a2d08b6870b16763c14c058b"
        var searchURL = "";
        return (

            <div>
            <SearchBox placeholder ="Enter movie name..." 
        handleChange = {
          (e) => {
            if (e.key==='Enter'){
              const newUrl = url +'&query=' + e.target.value
              searchURL = newUrl
              fetch(newUrl)
              .then((res) => res.json())
              .then((data) =>{
                const results = data.Search
                console.log("Data", results)
              })
              .catch((error) => {
                console.log("Error",error)
              })
            }    
        }
        }/>


        <br/>
            <h3>Movie would be chosen on screen and then you are taken to this form</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Room:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              datetime:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              duration:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
        );
      }
}