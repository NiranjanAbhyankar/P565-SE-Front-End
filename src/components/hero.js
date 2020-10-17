import React from "react";
import "../App.js";
import "../index.css"
import Banner from "./banner/Banner";
import { Container } from "react-bootstrap";
import requests from "../requests";
import Row from "./row/Row";


const Hero = () => {  
  return (
    <Container fluid className="hero">
      <Banner />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} isLargeRow/>
      <Row title="Family Movies" fetchURL={requests.fetchFamily} isLargeRow />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} isLargeRow/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} isLargeRow/>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} isLargeRow/>
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} isLargeRow/>
      
      
    </Container>
  );
}

export default Hero;
