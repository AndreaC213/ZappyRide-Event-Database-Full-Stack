import React, { Component } from 'react'
import axios from 'axios'

import './event-form.component.css';

class EventForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			organizer: '',
			venue: '',
			eventdate: ''
		}
	}

	submit() {
    console.log(this.state)
    let url="https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events";
    let data = this.state;
    fetch(url,{
      method: 'POST',
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
        <input type="text" value={(this.state.organizer)} name="organizer" onChange={( data )=>{ this.setState({organizer:data.target.value}) }} /> <br /> <br /> 
        <input type="text" value={(this.state.venue)} name="venue" onChange={( data )=>{ this.setState({venue:data.target.value}) }} /> <br /> <br />
        <input type="text" value={(this.state.eventdate)} name="eventdate" onChange={( data )=>{ this.setState({eventdate:data.target.value}) }} /> <br /> <br />
        <button onClick={() => { this.submit() }}>Add</button>
      </div>
    )
  }
}

export default EventForm;