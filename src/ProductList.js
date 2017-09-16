import React, { Component } from 'react'
import axios from 'axios';
import Producform from './Productform';

export default class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			updatedProducts: []
		}
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}

  handleChange(ev){
    //check to see which input is changing
    console.log()
    if (ev.target.name === 'name'){
      this.setState({name: ev.target.value});
    } else if (ev.target.name === 'price'){
      this.setState({price: ev.target.value});
    }
    else if (ev.target.name === 'inStock') {
      this.setState({ inStock: ev.target.checked });
    } else { //else case is category
      this.setState({ categoryId: ev.target.value })
    }
  }

  onSave(ev){
    console.log(ev.target)
  }

	render(){
		const { products, categories} = this.props;
    const { onSave, handleChange } = this;
    console.log(products)
		return (
			<div className="col-sm-6">
					{
						products.map( product => {
							return (
								<div className="col-sm-4" key={ product.id }>
									<div className="panel panel-default">
										<div className="panel-body">
											<form onSubmit={ onSave }>
												<div className="form-group">
													<label>Name</label>
													<input className="form-control" name="name" value={ product.name } onChange={ handleChange } />
												</div>
												<div className="form-group">
													<label>Price</label>
													<input className="form-control" name="price" type="number" value={ product.price } onChange={ handleChange } />
												</div>
                        <div className="form-group"><label>In stock</label><input className="pull-right" name="inStock" type="checkbox" checked={ product.inStock } onChange={ handleChange } />

                        </div>
												<div className="form-group">
													<label>Category</label>
                          <label>{product.category ? product.category.name : ''}</label>
													<select className="form-control" name="categoryId" value={ product.category ? product.category.name : '' } onChange={ handleChange }>
														<option>-- none! --</option>
														{
															categories.map( category => {
																return (
																	<option  key={ category.id } value={ category.name }>{ category.name }</option>
																)
															})
														}
													</select>
												</div>
                        <div className="form-group">
                          <button className="btn btn-primary btn-block">Save</button>
                          <button className="btn btn-danger btn-block">Delete</button>
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
