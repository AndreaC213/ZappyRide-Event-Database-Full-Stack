import React, { Component } from 'react'
import axios from 'axios'

import './event-list.component.css';

class PostList extends Component {
	constructor(props) {
		super(props)

		this.state = {
      events: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events')
			.then(response => {
				console.log(response)
				this.setState({ events: response.data.response })
				
			})
			.catch(error => {
        // console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { events, errorMsg } = this.state
		// console.log(events)
		return (

			<table>
				<h3>Welcome to the Ride-and Event Database!</h3>
				<p>Here are the events in the database:</p>
				<div class="wrapper"> 
					<div class="table">
						<div class="row header">
							<div class="cell">Organizer</div>
							<div class="cell">Venue</div>
							<div class="cell">Data</div>
						</div>
					<div class="row">
						{events.length ? events.map(item => 
							<div 
								class="cell"
								data-title="Organizer"
								key={item.id}
							>
								{item.organizer}
							</div>
						): null}
					</div>
					<div class="row">
						{events.length ? events.map(item => 
							<div 
							class="cell"
							data-title="Venue"
							key={item.id}
							> 
								{item.venue}
							</div>
						): null}
					</div>
					<div class="row">
						{events.length ? events.map(item => 
							<div 
								class="cell"
								data-title="Date"
								key={item.id}
							>
								{item.eventdate}
							</div>
						): null}
					</div>
					{errorMsg ? <div>{errorMsg}</div> : null}
					</div>
				</div>
				<button 
					class="buttonColor"
					onClick={() => window.location.reload(false)}>Refresh / Read
				</button>
			</table>


		)
	}
}

export default PostList