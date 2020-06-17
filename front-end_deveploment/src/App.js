import React, { Component } from 'react'
import './App.css'
import EventList from './components/event-list.component/event-list.component'
import EventForm from './components/event-form.component/event-form.component'

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