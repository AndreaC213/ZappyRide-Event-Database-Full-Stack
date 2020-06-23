import React from 'react'
import axios from 'axios'

import './event-form.component.css';

class EventForm extends React.Component {
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
				// console.log(response)
			})
			.catch(error => {
				// console.log(error)
			})
      this.setState({	organizer: '', venue: '', eventdate: '' })
	}

	render() {
		const { organizer, venue, eventdate } = this.state
		return (
			<div className="container">
				<h3>Add Event</h3>
				<form onSubmit={this.submitHandler}>
					<div className="aligned_form">
						<label>Organizer:</label>	
						<input
							type="text"
							name="organizer"
							value={organizer}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="aligned_form">
						<label >Venue:</label>	
						<input
							type="text"
							name="venue"
							value={venue}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="aligned_form">
						<label>Eventdate:</label>	
						<input
							type="text"
							name="eventdate"
							value={eventdate}
							onChange={this.changeHandler}
						/>
					</div>
					<button 
						className="customButton"
						type="submit">
							Submit
					</button>
				</form>
			</div>
		)
	}
}
export default EventForm;