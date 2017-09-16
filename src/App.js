import React, { Component } from 'react';
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Summary from './Summary'
import axios from 'axios'

class App extends Component {
	constructor(){
		super();
		this.state = {
      products: [],
      categories: []
		}
    this.onProductCreate = this.onProductCreate.bind(this);
	}

  onProductCreate(name, price, inStock, categoryId){
    axios.post('/api/products', {
      name, price, inStock, categoryId
    })
    .then( () => axios.get('/api/products')) //reload products
    .then(res => res.data)
    .then(data => this.setState({ products: data }));
  }

  componentDidMount(){
    const fetchProducts = axios.get('/api/products')
    const fetchCategories = axios.get('/api/categories')
    Promise.all([ fetchProducts, fetchCategories ])
    .then( ([_products, _categories]) => {
      this.setState({
        products: _products.data,
        categories: _categories.data,
      })
    })
  }

	render(){
    const { products, categories } = this.state;
    const { onProductCreate } = this;
		return (
			<div id="main">
				<h1>Hellllllo!</h1>
				<div className="container">
					<ProductList products={ products } categories={ categories } />
					<ProductForm categories={ categories } onProductCreate={ onProductCreate } />
				</div>
			</div>
		)
	}
}

export default App;
