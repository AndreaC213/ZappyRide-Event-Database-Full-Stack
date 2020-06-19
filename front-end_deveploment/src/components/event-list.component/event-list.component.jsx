import React, { Fragment } from "react";

import axios from 'axios'

import './event-list.component.css';

class EventList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      eventList: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('https://boee9mqtbe.execute-api.us-east-1.amazonaws.com/dev/events')
			.then(response => {
				console.log(response)
				this.setState({ eventList: response.data.response })
				
			})
			.catch(error => {
        // console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { eventList, errorMsg } = this.state
		// console.log(events)
		return (

			<div>
				<div className="container">
					<table> 
						<thead>
							<tr>
								<th>Organizer</th>
								<th>Venue</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
						{eventList.length ? eventList.map(item => 
								<tr key={item.id}>
									<td>{item.organizer}</td>
									<td>{item.venue}</td>
									<td>{item.eventdate}</td>
								</tr>
							): null}
						</tbody>
						{errorMsg ? <div>{errorMsg}</div> : null}
					</table>
				</div>
				
				<button 
					className="customButton"
					onClick={() => window.location.reload(false)}>Refresh / Read
				</button>
			</div>


		)
	}
}

export default EventList