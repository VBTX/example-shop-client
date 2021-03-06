import React, {Component} from 'react';
import '../App.css';
import Login from '../components/Login'
import Items from './Items'


class App extends Component {
	constructor(props){
		super()
		this.state = {
			currentUser: null,
			loginForm: {
				email: "",
				password: ""
			},
			items: []
		}
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			loginForm: {
				...this.state.loginForm,
				[name]: value
			}
		})
	}

	handleLoginFormSubmit = event => {
		event.preventDefault()
		//now need to submit info from the front to the back end where we authenticate the user
		//with that response set state
		const userInfo = this.state.loginForm
		const headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user: userInfo
			})
		}
		fetch(`http://localhost:3001/login`, headers )
		.then(r => r.json())
		.then(userJSON => {
			if (userJSON.error) {
				alert("Invalid Credentials")
			} else {
			this.setState({
				currentUser: userJSON
			})
		}
		})
		.catch(console.log)
		getItems = () => {
			
		}

	}

	render() {
		const { currentUser } = this.state
		return(
			<div className="App">
			<h2>{ currentUser ? `Logged in as ${currentUser.email}` : "Please log in"}</h2>
			
			<Login 
			handleLoginFormSubmit={this.handleLoginFormSubmit}
			email={this.state.loginForm.email}
			password={this.state.loginForm.password}
			handleChange={this.handleChange}/>
			<Items items={this.state.items}/>
			
			</div>
		);
	}
}

export default App;

//became a stateless component