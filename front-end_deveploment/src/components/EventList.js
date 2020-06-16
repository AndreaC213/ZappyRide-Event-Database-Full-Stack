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
				this.setState({ events: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { event, errorMsg } = this.state
		return (
			<div>
				Here are the events in the database:
				{event.length
					? event.map(event => <div key={event.id}>{event.title}</div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default PostList