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

			<div>
				<h3>Welcome to the Ride-and Event Database!</h3>
				<p>Here are the events in the database:</p>
				<div class="table-container"> 
					<div class="table">
					<div class="column-name">
						{events.length ? events.map(item => 
							<div class="data" key={item.id}>
								{item.organizer}
							</div>
						): null}
					</div>
					<div class="column-name ">{events.length ? events.map(item => <div key={item.id}>{item.venue}</div>): null}</div>
					<div class="column-name">{events.length ? events.map(item => <div key={item.id}>{item.eventDate}</div>): null}</div>
					{errorMsg ? <div>{errorMsg}</div> : null}
					</div>
				</div>
				<button 
					class="buttonColor"
					onClick={() => window.location.reload(false)}>Refresh / Read
				</button>
			</div>


		)
	}
}

export default PostList