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

	changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log({[e.target.name]: e.target.value})
	}

	submitHandler = e => {
		e.preventDefault()
		// console.log(this.state)
		axios
			.post('https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
      })
      this.setState({	organizer: '', venue: '', eventdate: '' })
	}

	render() {
		const { organizer, venue, eventdate } = this.state
		return (
			<div>

				<h3>Add Event</h3>
				<div class="container">
					<form onSubmit={this.submitHandler}>
						<div>
						<span>Organizer: </span>
							<input
								type="text"
								name="organizer"
								value={organizer}
								onChange={this.changeHandler}
							/>
						</div>
						<div>
						<span>Venue: </span>
							<input
								type="text"
								name="venue"
								value={venue}
								onChange={this.changeHandler}
							/>
						</div>
						
						<div>
							<span>Date: </span>
							<input
								type="text"
								name="eventdate"
								value={eventdate}
								onChange={this.changeHandler}
							/>
						</div>
					</form>
				</div>
				<button 
					class="customButton"
					type="submit">
						Submit
					</button>
			</div>
		)
	}
}

export default EventForm;