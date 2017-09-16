import React, { Component } from 'react'
import Productform from './Productform';

export default class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			updatedProducts: []
		}
	}

	render(){
		const { products, onSaveHandler, onDeleteHandler } = this.props;
    console.log(products)
		return (
			<div className="col-sm-6">
					{
						products.map( product => {
							return (
								<div className="col-sm-4" key={ product.id }>
									<div className="panel panel-default">
										<div className="panel-body">
                      <Productform product={ product } onSaveHandler={ onSaveHandler } onDeleteHandler={ onDeleteHandler } />
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
