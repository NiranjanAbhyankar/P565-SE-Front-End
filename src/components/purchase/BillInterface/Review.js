import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  price: {
      color: "black"
  },

}));



export default function Review(props) {
  const classes = useStyles();
  var totalCost = 0;
  const returnSnack = function(snack) {
    if (snack.quantity != 0){
        var newCost = (snack.price * snack.quantity) + totalCost;
        totalCost = newCost;

        return (
            <ListItem className={classes.listItem} key={snack.id}>
                <ListItemText primary={snack.name} secondary={"x"+snack.quantity} />
                <Typography className={classes.total}variant="subtitle1">{"$"+snack.price}</Typography>
            </ListItem>)
    }
  }

  const returnTickets = function(movie, ticketQuant) {
        totalCost += 10 * ticketQuant;

        return (
            <ListItem className={classes.listItem} key={movie.id}>
                <ListItemText primary={"Tickets for " + movie.name} secondary={"x"+ticketQuant} />
                <Typography className={classes.total} variant="subtitle1">{"$" + (10 * ticketQuant)}</Typography>
            </ListItem>)
    }
  


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
          {  console.log({valuesInReview: props.values})}
          {returnTickets(props.values.movie, props.values.ticketQuantity)}
        {props.values.concessions.map((snack) => returnSnack(snack))  }
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {"$" + totalCost}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Billing
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}