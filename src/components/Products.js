import React, {useState, useEffect} from "react";
import {Link, useOutletContext, useNavigate} from 'react-router-dom'
// View all products
const Products = () => {
    const {products} = useOutletContext();
    const navigate = useNavigate()
    async function buyNow(){
        alert('Purchase Successful')
        navigate('/')
    }
    return(
        <div className="productsContainer"> {
        products && products.length ? products.map((product, idx) => {
            // console.log()
            return(
                <div className="productsDiv" key={idx}>
                <div>
                    <p>Name: {product.title}</p>
                    <p>Price: ${product.price}</p>
                </div>
                <div>
                    <img src={product.photo} className="productImg"></img>
                </div>
                <div>
                    <button>
                        <Link className="link" to={`/products/${product.id}`}>INFO</Link>
                    </button>&nbsp;
                    <button className="link" onClick={buyNow}>Buy Now!</button>
                </div>
                </div>
            )
        }):<p>Loading tons of great Products now!</p>
    }</div>
    )
}

export default Products