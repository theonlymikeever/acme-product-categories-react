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
    .then(() => {
      const fetchProducts = axios.get('/api/products')
      const fetchCategories = axios.get('/api/categories')
      return Promise.all([ fetchProducts, fetchCategories ])
    })
    .then( ([_products, _categories]) => {
      this.setState({
        products: _products.data,
        categories: _categories.data,
      })
    })
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
				<h1>Acme Products Categories <br /><em>the React Version!</em></h1>
				<div className="container">
          <div className="row">
  					<ProductList products={ products } categories={ categories } />
            <div className="col-sm-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Add a Product
                </div>
                <div className="panel-body">
                <ProductForm categories={ categories } onProductCreate={ onProductCreate } />
                </div>
                </div>
              </div>
            <Summary products={ products } categories={ categories } />
          </div>
				</div>
			</div>
		)
	}
}

export default App;
