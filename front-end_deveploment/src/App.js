import React, { Component } from 'react'
import './App.css'
import EventList from './components/event-list.component/event-list.component'
import EventForm from './components/event-form.component/event-form.component'
import List from './components/List.component/List.component'

class App extends Component {
	render() {
		return (
			<div className="App">
        <div><EventList/></div>

        <div><EventForm /></div>
			</div>
		)
	}
}

export default App