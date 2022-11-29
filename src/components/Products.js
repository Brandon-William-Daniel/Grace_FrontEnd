import React, {useState, useEffect} from "react";
import {Link, useOutletContext} from 'react-router-dom'
// View all products
const Products = () => {
    const {products} = useOutletContext();
    return(
        products ? products.map((product, idx) => {
            return(
                <div className="productsDiv" key={idx}>
                <div>
                    <p>Name: {product.title}</p>
                </div>
                <div>
                    <img src={product.photo} className="productImg"></img>
                </div>
                <div>
                    <button>
                        <Link to={`/products/${idx + 1}`}>INFO</Link>
                    </button>
                    <button>Buy Now!</button>
                </div>
                </div>
            )
        }):<p>Nothing to show</p>
    )
}

export default Products