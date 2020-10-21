import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
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
    title:this.props.selectedMovie.title ? this.props.selectedMovie.title : this.props.selectedMovie.name , 
    theater: '', 
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
    this.fetchData()
  }

  fetchData = async function () {
    const fetchURL = "http://silo.soic.indiana.edu:29102/api/theaters";
    const request = await axios.get(fetchURL);
    // "https://api.themoviedb.org/3/discover/tv?api-key=${API_KEY}&with_networks=213"

    console.log( request.data[0]);
    this.setState({theaterInfo: request.data[0]})
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
          <FormPersonalDetails
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
