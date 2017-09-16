import React, { Component } from 'react';
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Summary from './Summary'

class App extends Component {
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return (
			<div id="main">
				<h1>Hellllllo!</h1>
				<div className="container">
					<ProductList />
				</div>
			</div>
		)
	}
}

export default App;