import React, { Component } from 'react'
import axios from 'axios';

export default class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			products: [],
			categories: []
		}
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}

  handleChange(ev){
    console.log(ev.target.value)
  }

  onSave(ev){
    console.log(ev.target)
  }

	render(){
		const { products, categories} = this.props;
    const { onSave, handleChange } = this;

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
													<input className="form-control" name="name" value={ product.name } onChange={ handleChange }/>
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
																	<option  key={ category.id } value={ category.id }>{ category.name }</option>
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
