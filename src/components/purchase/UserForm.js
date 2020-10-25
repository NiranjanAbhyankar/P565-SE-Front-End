import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import Concessions from './Concessions';
import Confirm from './Confirm';
import Success from './Success';
import axios from "axios";


export class UserForm extends Component {
  constructor(props) {
    super(props)
  
  }

  state = {
    step: 1,
    theaterInfo: [],
    showings: [],
    title:this.props.selectedMovie.title ? this.props.selectedMovie.title : this.props.selectedMovie.name , 
    showings: '', 
    time: '', 
    ticketQuantity: '1', 
    concessions: '',

    firstName: '' ,
    lastName: '',
    email: '',
    occupation: '',
    city: '',
    bio: ''
  };

  componentDidMount(){
    this.fetchTheaters()
    this.fetchShowings()
  }

  fetchTheaters = async function () {
    const fetchURL = "http://silo.soic.indiana.edu:29102/api/theaters";
    const request = await axios.get(fetchURL);

    console.log( request.data[0]);
    this.setState({theaterInfo: request.data[0]})
    //console.log(theater);
    // return request;
    return(request.data[0])
  }

  fetchShowings = async function(){
    const fetchURL = "http://silo.soic.indiana.edu:29102/api/showings";
    const request = await axios.get(fetchURL);

    console.log({requestedShowings: request.data});
    this.setState({showings: request.data[0]})
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

  render() {
    const { step } = this.state;
    const {title, theaterInfo, time, ticketQuantity, concessions, firstName, lastName, email, occupation, city, bio } = this.state;
    const values = {title, theaterInfo, time, ticketQuantity, concessions, firstName, lastName, email, occupation, city, bio };

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
          <Concessions
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
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

export default UserForm;
