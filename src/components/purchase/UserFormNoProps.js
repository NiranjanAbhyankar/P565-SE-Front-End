import React, { Component } from 'react';
import FormUserDetails from './TicketForm';
import ConcessionForm from './ConcessionForm';
import Confirm from './Confirm';
import Success from './Success';
import axios from "axios";
import { Next } from 'react-bootstrap/esm/PageItem';


export class UserFormNoProps extends Component {
  constructor(props) {
    super(props)
  
  }

  state = {
    step: 1,
    theaterInfo: [],
    showings: [],
    movie:[] ,//this.props.selectedMovie.title ? this.props.selectedMovie.title : this.props.selectedMovie.name , 
    showings: '', 
    selectedDate: '', 
    ticketQuantity: '1', 
    concessions: [],
  };

  componentDidMount(){
    this.fetchMovie();
    this.fetchTheaters()
    this.fetchShowings()
    this.fetchConcessions()
  }

  fetchTheaters = async function () {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
    const request = await axios.get(fetchURL);
    console.log("THEATER")
    console.log( request.data[0]);
    this.setState({theaterInfo: request.data[0]})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }

  fetchShowings = async function(){
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/showings" ;
    const request = await axios.get(fetchURL);
    let showings = []
    for (var i = 0; i < request.data.length; i++){
      // if the showing is for the same movie at the same selected location
      if (request.data[i].movie == parseInt(this.state.movie.tmdbid) && request.data[i].theater == this.state.theaterInfo.id){
        showings.push({
          id: request.data[i].id,
          theater: request.data[i].theater,
          room: request.data[i].room,
          dateTime: request.data[i].datetime,
          movieId: request.data[i].movie
        })
      } 
    }
    console.log("SHOWINGS")

    console.log({requestedShowings: showings});
    console.log({requestedShowings: request.data});

    this.setState({showings: showings})
  }

  fetchMovie = async function(){
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/movies" ;
    const request = await axios.get(fetchURL);
    this.setState({movie: request.data[0]})
    console.log("MOVIE")

    console.log(request.data[0])

  }

  
  fetchConcessions = async function () {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions";
    const request = await axios.get(fetchURL);
    const snax = []

    console.log( request.data[0]);
    for (var i = 0; i < request.data.length; i++){
     // console.log(request.data[i])
      snax.push({
        id: request.data[i].id,
        name: request.data[i].name,
        price: request.data[i].price,
        quantity: 0,
        key: i,
      })
    }
    this.setState({concessions: snax})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // handles concession
  handleConcess = (pos) => {

    let items = [...this.state.concessions]
    let item = {...items[pos]};
    let quan = parseInt(document.getElementById("concession"+pos).value);
    // if the field is empty, default to 0
    item.quantity = (Number.isNaN(quan) ? 0 : quan);
    items[pos] = item
    this.setState({concessions: items})
    console.log(item)

    }

  render() {
    const { step } = this.state;
    const {title, theaterInfo, time, ticketQuantity, concessions, movie} = this.state;
    const values = {title, theaterInfo, time, ticketQuantity, concessions,movie };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <ConcessionForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleConcess}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default UserFormNoProps;
