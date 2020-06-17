import React from 'react'


import axios from 'axios'

import './event-list.component.css';

class PostList extends React.Component {
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
				<table striped bordered hover> 
					<thead>
						<tr>
							<th><p>Organizer</p></th>
							<th><p>Venue</p></th>
							<th><p>Date</p></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{events.length ? events.map(item => 
								<td
									key={item.id}
								>
									{item.organizer}
								</td>
							): null}
						</tr>
					</tbody>
					<tbody>
						<tr>
							{events.length ? events.map(item => 
								<td
								key={item.id}
								> 
									{item.venue}
								</td>
							): null}
						</tr>	
					</tbody>
					<tbody>
						<tr>
							{events.length ? events.map(item => 
								<td
									key={item.id}
								>
									{item.eventdate}
								</td>
							): null}
						</tr>
					</tbody>
					{errorMsg ? <div>{errorMsg}</div> : null}
				</table>
				<button 
					class="buttonColor"
					onClick={() => window.location.reload(false)}>Refresh / Read
				</button>
			</div>


		)
	}
}

export default PostList