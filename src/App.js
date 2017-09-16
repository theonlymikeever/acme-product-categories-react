import React, { Component } from 'react';
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Summary from './Summary'
import axios from 'axios'

function fetchData(){
    const fetchProducts = axios.get('/api/products')
    const fetchCategories = axios.get('/api/categories')
    return Promise.all([ fetchProducts, fetchCategories ])
  }

class App extends Component {
	constructor(){
		super();
		this.state = {
      products: [],
      categories: []
		}
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
	}

  onSaveHandler(product){
    //new product creation
    if (!product.id){
      axios.post('/api/products', product)
      .then(() => {
        return fetchData()
      })
      .then( ([_products, _categories]) => {
        this.setState({
          products: _products.data,
          categories: _categories.data,
        })
      })
    }
    else {
      axios.put(`/api/products/${product.id}`, product)
      .then(() => {
        return fetchData()
      })
      .then( ([_products, _categories]) => {
        this.setState({
          products: _products.data,
          categories: _categories.data,
        })
      })
    }
  }

  onDeleteHandler(product){
    axios.delete(`/api/products/${product.id}`)
    .then(() => {
      return fetchData()
    })
    .then( ([_products, _categories]) => {
      this.setState({
        products: _products.data,
        categories: _categories.data,
      })
    })
  }

  componentDidMount(){
    fetchData()
    .then( ([_products, _categories]) => {
      this.setState({
        products: _products.data,
        categories: _categories.data,
      })
    })
  }

	render(){
    //data to pass for rendering
    const { products, categories } = this.state;
    //handler methods to pass
    const { onSaveHandler, onDeleteHandler } = this;
		return (
			<div id="main">
        <div className="container">
				<h1>Acme Products Categories <small>the React Version!</small></h1>
          <div className="row">
            <ProductList products={ products } categories={ categories } onSaveHandler={ onSaveHandler } onDeleteHandler={ onDeleteHandler } />
            <div className="col-sm-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Add a Product
                </div>
                <div className="panel-body">
                <ProductForm categories={ categories } onSaveHandler={ onSaveHandler } />
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
