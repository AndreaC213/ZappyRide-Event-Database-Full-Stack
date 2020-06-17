import React, { Component } from 'react'
import axios from 'axios'
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
				Here are the events in the database:
				{events.length ? events.map(item => <div key={item.id}>{item.organizer}</div>): null}
				{events.length ? events.map(item => <div key={item.id}>{item.venue}</div>): null}
				{events.length ? events.map(item => <div key={item.id}>{item.eventDate}</div>): null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default PostList