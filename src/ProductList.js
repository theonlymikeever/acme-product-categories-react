import React, { Component } from 'react'
import axios from 'axios';

class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			products: [],
			categories: []
		}
	}

	componentDidMount(){
		const fetchProducts = axios.get('/api/products')
		const fetchCatefories = axios.get('/api/categories')

		Promise.all([ fetchProducts, fetchCatefories ])
		.then( ([_products, _categories]) => {
			this.setState({
				products: _products.data,
				categories: _categories.data,
			})
		})
	}

	render(){
		const { products, categories} = this.state;

		return (
			<div className="col-sm-6">
					{
						products.map( product => {
							return (
								<div className="col-sm-4" key={ product.id }>
									<div className="panel panel-default">
										<div className="panel-body">
											<form>
												<div className="form-group">
													<label>Name</label>
													<input className="form-control" name="name" value={ product.name } />
												</div>
												<div className="form-group">
													<label>Price</label>
													<input className="form-control" name="price" type="number" value={ product.price } />
												</div>
												<div className="form-group">
													<label>Category</label>
													<select className="form-control" name="categoryId">
														<option>-- none! --</option>
														{
															categories.map( category => {
																return (
																	<option value={ category.id }>{ category.name }</option>
																)
															})
														}
													</select>
												</div>
											</form>
										</div>
									</div>
								</div>
							)
						})
					}
			</div>
		)
	}
}


export default ProductList;