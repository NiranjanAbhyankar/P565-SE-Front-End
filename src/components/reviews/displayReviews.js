import React, { useState, useEffect} from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const fetchURLAverage = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings/averageFor";
const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings/for/";

// Passing title as props
function DisplayReviews() {/*
  const [reviews, setReviews] = useState([])

  useEffect(() => {
      async function fetchData() {
        var reviewsTemp = []
        const request = await axios.get(fetchURL);
        return request.data;
      }
      setReviews(fetchData());
  }, [fetchURL]);
  */
 const [reviews, setReviews] = useState([])
 const movie = JSON.parse(localStorage.getItem("selectedMovie"));
 const [state, setState] = useState({
    snacks: []
 })
    useEffect(() => {
        async function fetchData() {
            axios(fetchURL+movie.tmdbid).then((request)=>{
                console.log(request.data);
                setState({ snacks: request.data}
                )
            })

        }
        fetchData();
    }, [fetchURL+movie.tmdbid]);

 
    
  return (
    <div>
    {console.log(state.snacks)}
    {state.snacks && state.snacks.map((review) => (
        <Paper elevation={3} variant="outlined">
            {console.log(review.stars)}
        <StarRatingComponent name = "star" value = {review.stars} starCount = {5} editing = {false}/>
        <Typography>{review.review}</Typography>
        </Paper>
    ))}
    </div>
  )
}
export default DisplayReviews;