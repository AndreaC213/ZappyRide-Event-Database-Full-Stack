import React, { Component } from 'react'
import axios from 'axios'
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
    console.log({[e.target.name]: e.target.value})
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { organizer, venue, eventdate } = this.state
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="organizer"
							value={organizer}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="venue"
							value={venue}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="eventdate"
							value={eventdate}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default EventForm;