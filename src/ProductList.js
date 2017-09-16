import React, { Component } from 'react'
import axios from 'axios';
import Productform from './Productform';

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
                      <Productform product={ product } />
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
