import React, { Component } from 'react';

export default class ProductForm extends Component {
	constructor(){
		super();
		this.state = {
      product: {
        name: '',
        price: 0,
        inStock: false,
        categoryId: null,
        category: null
      }
		}
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
	}

  componentWillMount(){
    if (this.props.product) {
     this.setState({ product: this.props.product })
    }
  }

  handleChange(ev){
    //check to see which input is changing
    const target = ev.target;
    const name = target.name;
    //will pull boolean out of checkbox otherwise the value
    const value = target.type === 'checkbox' ? target.checked : target.value
    //copy either current product or blank state before updating
    const { product } = this.state;
    //set new values before setState
    product[name] = value
    this.setState({product});
    // const { name, value, checked } = ev.target;
    // const { product } = this.state;
    // if (name === 'name'){
    //   product.name = value;
    //   this.setState({ product });
    // } else if (name === 'price'){
    //   product.price = value;
    //   this.setState({ product });
    // }
    // else if (name === 'inStock') {
    //   product.inStock = checked;
    //   this.setState({ product });
    // } else { //else case is category
    //   product.categoryId = value;
    //   product.categoy = name;
    //   this.setState({ product })
    // }
  }

  onSave(ev){
    ev.preventDefault();
    this.props.onSaveHandler(this.state.product)
    //reset form field
    if (!this.props.product) {
      this.setState({ product: {
          name: '',
          price: 0,
          inStock: false,
          categoryId: null
      }})
    }
  }

  onDelete(ev){
    ev.preventDefault();
    this.props.onDeleteHandler(this.props.product)
  }

	render(){
    const allCategories = this.props.categories
    const { product } = this.state
    const { name, price, inStock, categoryId } = product;
    //handler methods
    const { onSave, handleChange, onDelete } = this;
		return (
            <form onSubmit={ onSave }>
              <div className="form-group">
                <label>Name</label><input className="form-control" name="name" value={ name } onChange={ handleChange } />
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
                <select className="form-control" name="categoryId" onChange={ handleChange } value={ categoryId ? categoryId : ''}>
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
                { /* load delete button on products */
                  product.id ? <button onClick={ onDelete } className="btn btn-danger btn-block">Delete</button> : null
                }
              </div>
            </form>
		          )
	}
}
