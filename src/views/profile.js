import React, { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { Highlight, Loading } from "../components";
import axios from "axios";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import DisplayOrders from "../components/user_profile/displayOrders";
import DisplayOrdersMan from "../components/user_profile/displayOrdersMan";

const Profile = () => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup} = useAuth0();
  const { nickname, picture, email } = user;
  const [values, setValues] = useState({
    isManager: false
  });

  useEffect(() => {
    async function isManager(){
      const accessToken = await getAccessTokenSilently({
        audience: "MainAPI",
        scope: ""
      });
      let request = await axios({
          url: 'https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager',
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
          }
      });
      let x = request.data === 'True';
      setValues({isManager: x})
    };
    isManager();
  }, ["https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager"]);
  
  
  async function makeCurrentUserAManager() {
    const accessToken = await getAccessTokenSilently({
      audience: "MainAPI",
      scope: ""
    });
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/becomeManager", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.send();
  };

  async function managerTheaters(){
    axios("https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters").then((request)=> {

    })
  };


  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{nickname}</h2>
          {console.log(values.isManager)}
          {values.isManager? <p className="lead text-muted">Manager</p>:<p className="lead text-muted">Customer</p> }
          <p className="lead text-muted">{email}</p>
        </Col>
      </Row>
      <Row>
        <h2>Purchase History</h2>
        <br></br>
        {values.isManager? <DisplayOrdersMan/>: <DisplayOrders></DisplayOrders>}
        
      { /** <Highlight>{JSON.stringify(user, null, 2)}</Highlight> */}
      </Row>
      {values.isManager ? <Button>Add Theater</Button>:<Button size="small" color="primary" onClick={makeCurrentUserAManager}>Become A Manager </Button>
}
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
