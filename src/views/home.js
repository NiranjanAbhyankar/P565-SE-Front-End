import React from "react";
import { Container } from "react-bootstrap";
import { Hero } from "../components";
import "../App.css";



const Home = () => {
  return(
    <Container  className="home" >
      <Hero />
    </Container>
  )
}
  

export default Home;
