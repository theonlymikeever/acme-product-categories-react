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
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
	}

  onSaveHandler(product){
    //new product creation
    if (!product.id){
      axios.post('/api/products', product)
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
    else {
      axios.put(`/api/products/${product.id}`, product)
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
  }

  onDeleteHandler(product){
    axios.delete(`/api/products/${product.id}`)
    .then(() => {
      const fetchProducts = axios.get('/api/products')
      const fetchCategories = axios.get('/api/categories')
      return Promise.all([ fetchProducts, fetchCategories ])
    })
    .then( ([_products, _categories]) => {
      console.log('...')
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
    //data to pass for rendering
    const { products, categories } = this.state;
    //handler methods to pass
    const { onSaveHandler, onDeleteHandler } = this;
		return (
			<div id="main">
				<h1>Acme Products Categories <br /><em>the React Version!</em></h1>
				<div className="container">
          <div className="row">
  					<ProductList products={ products } categories={ categories } onSaveHandler={ onSaveHandler } onDeleteHandler={ onDeleteHandler }/>
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
