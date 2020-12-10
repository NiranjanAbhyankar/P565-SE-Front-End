import React, { useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useAuth0} from "@auth0/auth0-react";
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { DataGrid } from '@material-ui/data-grid';
import StarRatingComponent from 'react-star-rating-component';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paperStyle:{
    background: "#d6dbe0",
    padding: 30
  },
});

function CreateReview() {
    const classes = useStyles();
    const { getAccessTokenSilently } = useAuth0();
    const movie = JSON.parse(localStorage.getItem("selectedMovie"));
    const [values, setValues] = useState({
        tmdbid: movie.tmdbid,
        stars: 0,
        review: '',
      });

    const handleChange = () => (event) => {
        setValues({tmdbid:movie.tmdbid, stars: values.stars, review: event.target.value });
        console.log(values);
      };
    function onStarClick(prop) {
        console.log(prop);
        setValues({tmdbid:movie.tmdbid, stars: prop, review:values.review});
    };
    async function handleClick (){
      var dict = {
        "tmdbid": values.tmdbid,
        "stars": values.stars,
        "review": values.review === undefined ? '' : values.review,
      };
      console.log(dict);
      const accessToken = await getAccessTokenSilently({
        audience: "MainAPI",
        scope: ""
      });
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.send(JSON.stringify(dict));
      window.location.reload(false);
    };

    return (
        <div >
        <Paper className={classes.paperStyle}>
        <Typography variant="h5">Rate {movie.name}:</Typography>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={values.stars}
          onStarClick={onStarClick}
        />
        <br></br>

        <TextField
          id="outlined-multiline-static"
          label="Write A Review"
          multiline
          rows={2}
          fullWidth={true}
          variant="outlined"
          onChange={handleChange()}
        />
        <br/><br/>
        <Button variant="outlined"
           color="primary"
            onClick={handleClick}
            >Submit</Button> <br/>
        </Paper>
        </div>
    )
}

export default CreateReview
