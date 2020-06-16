import React, { Component } from 'react'
import './App.css'
import EventList from './components/EventList'
import EventForm from './components/EventForm'

class App extends Component {
	render() {
		return (
			<div className="App">
				<EventList />
				<EventForm />
			</div>
		)
	}
}

export default App