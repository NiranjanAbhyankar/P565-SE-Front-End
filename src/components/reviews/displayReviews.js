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
 const [reviews, setReviews] = useState([])
 const [state, setState] = useState({
    snacks: []
 })
    useEffect(() => {
        async function fetchData() {
            axios(fetchURL).then((request)=>{
                console.log(request.data);
                setState({ snacks: request.data}
                )
            })

        }
        fetchData();
    }, [fetchURL]);

 
    
  return (
    <div>
    {console.log(state.snacks)}
    {state.snacks && state.snacks.map((review) => (
        <div>
            {console.log(review.stars)}
        <StarRatingComponent name = "star" value = {review.stars} starCount = {5} editing = {false}/>
        <h2>{review.review}</h2>
        </div>
    ))}
    </div>
  )
}
export default DisplayReviews;