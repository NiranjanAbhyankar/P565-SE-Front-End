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

function CreateReview() {
    const { getAccessTokenSilently } = useAuth0();
    const [values, setValues] = useState({
        tmdbid: '',
        stars: 0,
        review: '',
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
      };
    function onStarClick(prop) {
        console.log(prop);
        setValues({stars: prop});
    };
    async function handleClick (){
      var dict = {
        "tmdbid": 155,
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
  
    };

    return (
        <div >
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={values.stars}
          onStarClick={onStarClick}
        />
        <br></br>
        <TextField id="standard-basic" 
          label="Your Review"
          onChange={handleChange('review')} />
        <br/>
        <Button variant="outlined"
           color="primary"
            onClick={handleClick}
            >Submit</Button>
        </div>
    )
}

export default CreateReview
