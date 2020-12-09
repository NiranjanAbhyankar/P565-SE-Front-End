import React, { useState, useEffect} from "react";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';






const fetchURLAverage = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings/averageFor";
const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/ratings/for/155";

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
 const [state, setState] = useState({
    snacks: [],
 })
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            console.log(request.data);
            setState(prevState =>{

                return {...prevState, snacks:request.data}
              })
            // return request;
          }
        fetchData();
    }, [fetchURL]);

 
    
  return (
    <div>
    {/*state.snacks*/}
    {/*reviews && reviews.map((review) => (
        <div>
            {console.log(review.rating)}
        <StarRatingComponent value = {review.rating} starCount = {5} editing = {false}/>
        <Typography>{review.review}</Typography>
        </div>
    ))*/}
    </div>
  )
}
export default DisplayReviews;