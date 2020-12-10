import React, { useState, useEffect} from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paperStyle:{
    background: "#e4e7eb",
    padding: 30
  },
});

const bookingsURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/bookings";
const theatersURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
const moviesURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/movies";
const snacksURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions";


function DisplayOrders() {
 const classes = useStyles();
 const [orders, setOrders] = useState([]);
 const { user } = useAuth0();


    useEffect(() => {
        async function fetchData() {
            const bookingsRequest = await axios.get(bookingsURL);
            const info = bookingsRequest.data;
            console.log({BOOKINGiNFO: info});
            setOrders(info);
        }
        fetchData();
    }, [bookingsURL]);

     /*async function fetchInfo(){
        const bookingsRequest = await axios.get(fetchURL);
        const info = bookingsRequest.data;
        console.log(info);
        setOrders(info);

       const theatersRequest = await axios.get(fetchURL);
        console.log(theatersURL).data;

        const bookingsRequest = await axios.get(fetchURL);
        console.log(bookingsRequest).data;

        const bookingsRequest = await axios.get(fetchURL);
        console.log(bookingsRequest).data;
     }
        */
    
    const viewOrder = (order) => {
        console.log(order)
        console.group(user.sub)

        if(order.customer == user.sub){
            return(
                <div>
               <p>{JSON.stringify(order)} </p>
               <br></br>
               </div>
              
            )
        }
    }

 
    
  return (
    <div>
    <Paper className={classes.paperStyle}>
            {orders.map((order) => (
             viewOrder(order)))}
  
        
    </Paper>
    </div>
  )
}
export default DisplayOrders;