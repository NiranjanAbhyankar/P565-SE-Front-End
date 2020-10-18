import React from "react";
import { Container, Row } from "react-bootstrap";
import AddShowing from "../components/manager/AddShowing";
import Theater_Info from "../components/manager/Theater-info";
import AddMovie from "../components/manager/addMovie";


const ManDashboard = () => {
  
    return (
        <Container className="mb-5" >
          <Theater_Info/>
          <br/>
          <AddShowing/>
          <br/>
          <AddMovie/>
        </Container>
      );
    };

export default ManDashboard;