import React, { Component } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Summary from './Summary';
import ErrorBox from './ErrorBox';
import axios from 'axios'

//fetch utill function
function fetchData(){
    const fetchProducts = axios.get('/api/products')
    const fetchCategories = axios.get('/api/categories')
    return Promise.all([ fetchProducts, fetchCategories ])
      .then( ([products, categories]) => {
        return [ products.data, categories.data ]
      })
}

export default class App extends Component {
	constructor(){
		super();
		this.state = {
      products: [],
      categories: [],
      error: null
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
      .then( ([ products, categories ]) => this.setState({ products, categories }))
      .catch((err) => this.setState({ error: err.response.data.errors[0].message }))
    } // updating a product
    else {
      axios.put(`/api/products/${product.id}`, product)
      .then(() => {
        return fetchData()
      })
      .then( ([ products, categories ]) => this.setState({ products, categories }))
      .catch((err) => this.setState({ error: err.response.data.errors[0].message }))
    }
  }

  onDeleteHandler(product){
    axios.delete(`/api/products/${product.id}`)
    .then(() => {
      return fetchData()
    })
    .then( ([ products, categories ]) => this.setState({ products, categories }));
  }

  componentDidMount(){
    fetchData()
    .then( ([ products, categories ]) => this.setState({ products, categories }));
  }

	render(){
    //data to pass for rendering
    const { products, categories, error } = this.state;
    //handler methods to pass
    const { onSaveHandler, onDeleteHandler } = this;
		return (
			<div id="main">
        <div className="container">
				<h1>Acme Products Categories <small>the React Version!</small></h1>
          <div className="row">
            {
              error ? <ErrorBox error={ error } /> : null
            }
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
