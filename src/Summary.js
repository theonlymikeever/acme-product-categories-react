import React from 'react'

export default function Summary (props) {
  const { products, categories } = props;
  let productAmount = products.length;

  let mostExpensive = products.reduce((prev, curr) => {
    return curr.price > prev.price ? curr : prev
  }, products[0]) || ''; //set to empty string for async

  let stockList = products.filter(prod => {
    return prod.inStock
  });

  return (
    <div className="col-sm-3">
      <div className="panel panel-default">
        <div className="panel-heading">
          Product Summary
        </div>
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item">There are <strong>{ productAmount }</strong> products.</li>
            <li className="list-group-item">Categories
              <ul>
                {
                  categories.map( cat => {
                    return (
                      <li key={ cat.id }>{ cat.name } has <strong>{ cat.products.length }</strong> products</li>
                    )
                  })
                }
              </ul>
            </li>
            <li className="list-group-item">Most Expensive product is <strong>
            { mostExpensive.name }
            </strong> at { mostExpensive.price }</li>
            <li className="list-group-item">Products not in stock are<br />
            {
              stockList.map(prod => {
                return <span key={ prod.id }>{prod.name} </span>
              })
            }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
