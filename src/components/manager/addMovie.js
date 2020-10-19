import React, { Component } from "react";
class AddMovie extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tmdbid: "155",
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {


/*
        var array = [
        { "tmdbid": 807,
            "name": "",
            "description": "",
            "year": 0,
            "posterurl": ""
        }] */

    var array = [
        { "tmdbid": 807,
          "name": "Se7en",
          "description": "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the \"seven deadly sins\" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get inside the killers mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.",
          "year": 1995,
          "posterurl": "GQP6noTBKsYiAYyn8PYXFcsSgH.jpg"
        }
      ];

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://silo.soic.indiana.edu:29102/api/movies", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(array));

      
    console.log(array);

      return (
        <form>
          <label>
            TMBD ID:
            <input
              name="tmdbid"
              type="text"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }

  export default AddMovie;