import React from 'react';

import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      organizer:"",
      venue:"",
      date:""
    }
  }

  submit() {
    console.log(this.state)
    let url="https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events";
    let data = this.state;
    fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
        'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      crossDomain: true,
      body:JSON.stringify(data)
    }).then((result) => {
      result.json().then((response) => {
        console.warn("response", response)
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Add Event</h1> 
        <input type="text" value={(this.state.organizer)} name="organizer" onChange={( data )=>{ this.setState({organizer:data.target.value}) }} /> <br /> <br /> 
        <input type="text" value={(this.state.venue)} name="venue" onChange={( data )=>{ this.setState({venue:data.target.value}) }} /> <br /> <br />
        <input type="text" value={(this.state.date)} name="date" onChange={( data )=>{ this.setState({date:data.target.value}) }} /> <br /> <br />
        <button onClick={() => { this.submit() }}>Add</button>
      </div>
    )
  }
}
