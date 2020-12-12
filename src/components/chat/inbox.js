import React, { useState, useEffect} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
function Inbox(props) {
    const { isAuthenticated, loginWithRedirect, logout,  user, getAccessTokenSilently, getAccessTokenWithPopup } =useAuth0();
    const { history } = props;
    const [values, setValues] = useState({
        isManager: false
      });
      
   const [state, setState] = useState({
      theaters: []
   })
      useEffect(() => {
          async function fetchData() {
              axios(fetchURL).then((request)=>{
                  console.log(request.data);
                  setState({ theaters: request.data}
                  )
              })
  
          }
          fetchData();
          if(isAuthenticated){
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
          }
      }, [fetchURL,'https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/isManager' ]);
      
    const handleClick = () =>{
        console.log("click")
        history.push("/chat")
    }
   
      
    return (
      <div>
    {!values.isManager && (
      <List>
      {state.theaters && state.theaters.map((theater) => (
          <div>
          <ListItem button onClick = {handleClick}>
              <ListItemText primary={theater.name} secondary={theater.city}></ListItemText>
          </ListItem>
          <Divider />
          </div>
      ))}
      </List>)
    }
    {values.isManager && (
      <List>
          <ListItem button onClick = {handleClick}>
              <ListItemText primary="Louie Labuzienski"></ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick = {handleClick}>
              <ListItemText primary="Elon Musk"></ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick = {handleClick}>
              <ListItemText primary="Adeel Bhutta"></ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick = {handleClick}>
              <ListItemText primary="Vivek"></ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick = {handleClick}>
              <ListItemText primary="Jim"></ListItemText>
          </ListItem>
          <Divider />
      </List>
    )
    }
    </div>
    );
}
  export default withRouter(Inbox);