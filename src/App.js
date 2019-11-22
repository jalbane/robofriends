import React, {Component} from 'react';
import {connect} from 'react-redux'
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css'
import Scroll from './Scroll';

import {setSearchField} from './actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component{
	constructor(){
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount(){
		fetch('http://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots: users}));
	}

	render(){
		const {robots} = this.state
		const {searchField, onSearchChange} = this.props
		const filteredRobots = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);