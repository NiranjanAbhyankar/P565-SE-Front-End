import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import { Hero } from "../components";
import "../App.css";



export class Home extends Component {
  constructor(props) {
    super(props)
  
  }

  funk = function(){
    return "FUNKY FUNKS"
  }

  render(){
    return(
      <Container fluid  className="home" >
        <Hero slx = {this.props.selectedMovie} selectMovieApp = {this.props.selectMovieApp}></Hero>
      </Container>
    )
  }
}
  

export default Home;
