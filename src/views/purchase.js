import React from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import UserForm from "../components/purchase/UserForm";



const Purchase = () => {
  return(
    <Container fluid  className="home" >
      <UserForm />
    </Container>
  )
}
  

export default Purchase;
