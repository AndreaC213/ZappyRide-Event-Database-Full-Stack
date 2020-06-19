import React, { Component } from 'react'
import './App.css'
import EventList from './components/event-list.component/event-list.component'
import EventForm from './components/event-form.component/event-form.component'

class App extends Component {
	render() {
		return (
      
			<div>
        <h1>Welcome to the Ride-and Event Database!</h1>
				<h3>Here are the events in the database:</h3>
        <div><EventList/></div>
        <h3>Add Event</h3>
        <div><EventForm /></div>
			</div>
		)
	}
}

export default App