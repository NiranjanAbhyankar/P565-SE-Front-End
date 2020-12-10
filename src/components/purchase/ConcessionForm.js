import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core/';
import axios from "axios";



export class ConcessionForm extends Component {
  constructor(props){
    super(props)
  }



  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidMount(){
    this.fetchConcessions();
    console.log(this.props.values.concessions)
    }

    formTitle(){
      return("Concessions Available at " + this.props.values.theaterInfo.name)
    }

    
  fetchConcessions = async function () {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions";
    const request = await axios.get(fetchURL);
    const snax = []

    console.log( request.data[0]);
    for (var i = 0; i < request.data.length; i++){
     // console.log(request.data[i])
     // if (snackTheaterID == values.theaterInfo.id)
      snax.push({
        id: request.data[i].id,
        name: request.data[i].name,
        price: request.data[i].price,
        image: request.data[i].image,
        quantity: 0,
        key: i,
      })
    }
    console.log({snax: snax})
    this.setState({concessions: snax})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }
  render() {
    const { values, handleChange } = this.props;

    return (
      <div>
            <AppBar title="Select Concessions" />
            <h3>Concessions available at {values.theaterInfo.name}</h3>
            <List width={250} style= {{maxWidth: "500px"}}>
            {this.props.values.concessions.map((snack) => (
             <ListItem >
               {console.log(snack)}
               <img padding={10}  height = {50} className="snack_image" src = {snack.image}/>
               <ListItemText width={40} primary={snack.name} secondary={'$'+snack.price}></ListItemText>
               
               <TextField
              placeholder={snack.quantity}
              style={{maxWidth:"50px"}}
              label="Quantity"
              type="number"
              onChange={(e) => handleChange(snack.key)}
              defaultValue={snack.quantity}
              margin="normal"
              id = {"concession" + snack.key}
              key = {snack.key}
            />
             </ListItem>
             
        ))}
  
            </List>
            <br />

            
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue to Checkout</Button>
      </div>
    );
  }
}

export default ConcessionForm;
