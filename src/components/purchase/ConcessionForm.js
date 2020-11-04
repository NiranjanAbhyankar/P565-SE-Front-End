import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import axios from "axios";



export class ConcessionForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidMount(){
    console.log(this.props.values.concessions)
    }

    formTitle(){
      return("Concessions Available at " + this.props.values.theaterInfo.name)
    }

  render() {
    const { values, handleChange } = this.props;


    return (
      <div>
 
            <AppBar title="Enter Personal Details" />
            <h3>Concessions available at {this.props.values.theaterInfo.name}</h3>
            <List>
            {this.props.values.concessions.map((snack) => (
             <ListItem>
               <ListItemText primary={snack.name} secondary={'$'+snack.price}></ListItemText>
               <TextField
              placeholder="0"
              label="Quantity"
              type="number"
              onChange={(e) => handleChange(snack.key)}
              defaultValue={snack.quantity}
              margin="normal"
              id = {"concession" + snack.key}
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
            >Continue</Button>
      </div>
    );
  }
}

export default ConcessionForm;
