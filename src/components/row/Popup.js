import React, { useState, useEffect} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import ViewFormsButton from './ViewFormsButton';
import { useAuth0 } from "@auth0/auth0-react";
import StarRatingComponent from 'react-star-rating-component';

const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings/averageFor/";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Popup({ selected, handleClose, open, baseUrl, viewForm, closeForm }) {
  const classes = useStyles();
  const { isAuthenticated } =useAuth0();
  const [rating, setRating] = useState({});


  if(selected != undefined){
  async function fetchData() {
    const request = await axios.get(fetchURL+selected.tmdbid);
    setRating(request.data);
    console.log(request.data);
  }
    fetchData();
  }

  


  return (
      selected  ?
      <Dialog open = {open} onClose = {handleClose}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${baseUrl}${selected.backdrop_path ? selected.backdrop_path : selected.posterurl}`} 
          title= {(selected.name? selected.name : selected.title)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {(selected.name? selected.name : selected.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selected.description}
          </Typography>
          <StarRatingComponent value = {rating} starCount = {5} editing = {false}/>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        {isAuthenticated ? <a href="/purchase"><ViewFormsButton selectedMovie = {selected}/></a>
        : <Button onClick = {()=>alert("Please log in to purchase tickets")}>Log in</Button>}
        <a href="about-movie">
        <Button size="small" color="primary" >
          See Reviews
        </Button>
        </a>

        <Button size="small" color="primary" onClick={handleClose}>
          Close
        </Button>
       
      </CardActions>
    </Card>
    </Dialog>
    :
    ""
  );
 
}
/* 
replace the <a>
viewForm = {viewForm}
        closeForm = {closeForm}
        */

/*import React from 'react'

function Popup({ selected, closePopup,baseUrl }) {
	return (
		<section className="popup">
			<div className="content">
				<h2>{ (selected.name? selected.name : selected.title)} <span>({ selected.release_date })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				<div className="plot">
					<img src={`${baseUrl}${selected.poster_path}`} />
					<p>{selected.overview}</p>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup
*/