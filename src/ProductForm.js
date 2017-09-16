import React, { Component } from 'react';
import axios from 'axios';


export default class ProductForm extends Component {
	constructor(){
		super();
		this.state = {
      allCategories: [],
      name: '',
      price: 0,
      inStock: false,
      categoryId: null
		}
    this.handleChange = this.handleChange.bind(this)
    this.onCreate = this.onCreate.bind(this);
	}

  componentDidMount() {
    axios.get('/api/categories')
    .then( res => res.data )
    .then( data => this.setState({ allCategories: data }));
  }

  handleChange(ev){
    //check to see which input is changing
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

  onCreate(ev){
    ev.preventDefault();
    const { name, price, inStock, categoryId } = this.state;
    this.props.onProductCreate(name, price, inStock, categoryId)
    //clear form needed
  }

	render(){
    const { allCategories, name, price, inStock } = this.state;
    const { onCreate, handleChange } = this;
		return (
			<div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            Add a Product
          </div>
          <div className="panel-body">
            <form onSubmit={ onCreate }>
              <div className="form-group">
                <label>Name</label><input className="form-control" name="name" value={ name }onChange={ handleChange } />
              </div>
              <div className="form-group">
                <label>Price</label><input className="form-control" name="price" type="number" value={ price } onChange={ handleChange } />
              </div>
              <div className="form-group">
                <label>In stock </label>
                <input className="pull-right" name="inStock" type="checkbox" checked={ inStock } onChange={ handleChange } />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-control" name="categoryId" onChange={ handleChange }>
                  <option>-- none --</option>
                  {
                    allCategories.map( cat => {
                      return (
                         <option key={ cat.id } value={ cat.id }>{ cat.name }</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Save</button>
              </div>
            </form>
          </div>
        </div>
			</div>
		)
	}

}
