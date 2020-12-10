import React, { Component } from 'react';
import TicketForm from './TicketForm';
import ConcessionForm from './ConcessionForm';
import Confirm from './Confirm';
import Success from './Success';
import axios from "axios";
import TheaterForm from "./TheaterForm"
import Checkout from './BillInterface/Checkout';


export class UserForm extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    availableTheaters : [],
    availableShowings: [],
    step: 1,
    movie: JSON.parse(localStorage.getItem("selectedMovie")),
    theaterInfo: [],
    selectedShowing: [],
    time: '', 
    ticketQuantity: '1', 
    concessions: [],
  };

  componentDidMount(){
    this.fetchShowings()
    this.fetchConcessions()

    this.fetchTheaters()
  }

  fetchTheaters = async function () {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/theaters";
    const request = await axios.get(fetchURL);

    console.log( request.data[0]);
    this.setState({availableTheaters: request.data})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }

  fetchShowings = async function(){
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/showings";
    const request = await axios.get(fetchURL);
    var sampleShowings = []
    request.data.map((showing) => {
     // console.log({tmdbid: this.state.movie,
      //              showingMovie: showing.movie})
      if (showing.movie == parseInt(this.state.movie.tmdbid))
      sampleShowings.push(showing)
    })
    this.setState({ ["selectedShowing"]: sampleShowings[0] });


    console.log({requestedShowings: request.data,
                  currentMovie: parseInt(this.state.movie.tmdbid),
                    filteredShowings: sampleShowings});
    this.setState({availableShowings: sampleShowings})
  }

  fetchConcessions = async function () {
    const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions";
    const request = await axios.get(fetchURL);
    const snax = []

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
    console.log({snaxUserForm: snax})
    this.setState({concessions: snax})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }


  // Proceed to next step
  nextStep = () => {
    console.log(this.selectedMovie);
    console.log(this.state)
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

  handleConcess = (pos) => {
    let items = [...this.state.concessions]
    let item = {...items[pos]};
    console.log({itemToBeChanged: item})
    // get the quantity selected
    let quan = parseInt(document.getElementById("concession"+pos).value);
    // if the field is empty, default to 0
    item.quantity = (Number.isNaN(quan) ? 0 : quan);
    items[pos] = item
    this.setState({concessions: items})
    console.log(items)

    }

  render() {
    const { step } = this.state;
    const {availableShowings, availableTheaters, movie, theaterInfo, selectedShowing, time, ticketQuantity, concessions } = this.state;
    const values = {availableShowings, availableTheaters, movie, theaterInfo, selectedShowing, time,  ticketQuantity, concessions};

    switch (step) {
      case 1:
        return (
          <TheaterForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <TicketForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}

            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <ConcessionForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleConcess}
            values={values}
          />
        );

      case 4:
        return <Checkout 
                values = {values}
                />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default UserForm;
