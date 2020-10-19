import React, { Component } from "react";
export default class AddShowing extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A showing was added: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
            <div>
            <h3>Movie would be chosen on screen and then you are taken to this form</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Room:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              datetime:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              duration:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
        );
      }
}