import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import ViewShowingsButton from './ViewShowingsButton';
import { useAuth0 } from "@auth0/auth0-react";



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MoviePopup({ selected, handleClose, open, baseUrl, handleViewTimes }) {
  const classes = useStyles();

    const isAuthenticated  = useAuth0();

  return (
      selected  ?
      <Dialog open = {open} onClose = {handleClose}>
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${baseUrl}${selected.backdrop_path ? selected.backdrop_path : selected.poster_path}`} 
          title= {(selected.name? selected.name : selected.title)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {(selected.name? selected.name : selected.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selected.overview}
          </Typography>
        </CardContent>
      <CardActions>

       {isAuthenticated ? <ViewShowingsButton handleViewTimes ={handleViewTimes}handleClose = {handleClose} /> : ""}
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

/**  import React from 'react'

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

export default Popup */
