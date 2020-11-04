import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {title, theaterInfo, time, ticketQuantity, concessions, movie }
    } = this.props;
    return (
      
        <>
     
            <AppBar title="Confirm Purchase" />
            <List>
              <ListItem>
          

               <b> <ListItemText primary={"Tickets for "+ movie.name + " x" + ticketQuantity} secondary={"$" + 6 * ticketQuantity} /></b>
              </ListItem>
              <h5>Concessions Purchased</h5>
              
              
              
              {this.props.values.concessions.map ((snack) => (
                snack.quantity > 0 ?
             <ListItem>
               <ListItemText primary={snack.name + " x" + snack.quantity} secondary={'$'+snack.price * snack.quantity}></ListItemText>

             </ListItem> 
             :
             <></>
             
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
            >Confirm & Continue</Button>
        </>
   
    );
  }
  showConcessions(concessions){
    concessions.map(concession => <ListItemText primary={concession.name} secondary={concession.quantity} />
    )
  }
}

export default Confirm;
