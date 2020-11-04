import React, { Component } from 'react';
import FormShowingDetails from './FormShowingDetails';
import FormMovieDetails from './FormMovieDetails';
import Confirm from './Confirm';
import Success from './Success';

export class ShowingForm extends Component {
  state = {
    
    step: 1,
    tmdbid: "",
    time: '',
    room: '',
    duration: '',

  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    console.log(this.props.info)
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
    console.log("change: " + e.target.value);
  };

  //handle movie selection
  handleMovieChange = input => {
    this.setState({'tmdbid': input})
  }

  render() {
    const { step } = this.state;
    const { tmdbid, time, room, duration} = this.state;
    const values = { tmdbid, time, room, duration};

    switch (step) {
      case 1:
        return (
          <FormMovieDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleMovieChange={this.handleMovieChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormShowingDetails
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

export default ShowingForm;
