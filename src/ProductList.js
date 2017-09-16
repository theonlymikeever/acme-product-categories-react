import React, { Component } from 'react'
import ProductForm from './ProductForm';

export default class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			updatedProducts: []
		}
	}

	render(){
		const { products, categories, onSaveHandler, onDeleteHandler } = this.props;
		return (
			<div className="col-sm-6 well">
					{
						products.map( product => {
							return (
								<div className="col-sm-4" key={ product.id }>
									<div className="panel panel-default">
										<div className="panel-body">
                      <ProductForm product={ product } categories={ categories } onSaveHandler={ onSaveHandler } onDeleteHandler={ onDeleteHandler } />
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
