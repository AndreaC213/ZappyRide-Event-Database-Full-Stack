import React, { Component } from 'react'
import './App.css'
import EventList from './components/event-list.component/event-list.component'
import EventForm from './components/event-form.component/event-form.component'

class App extends Component {
	render() {
		return (
      
			<div >
        <h1>Welcome to the Ride-and-Drive Event Database!</h1>
				<h2>Here are the events in the database:</h2>
				<div class="row">
					<div class="col-12"><EventList/></div>
					<h3 class="col-12"></h3>
					<div class="col-12"><EventForm /></div>
				</div>
			</div>
		)
	}
}

export default App