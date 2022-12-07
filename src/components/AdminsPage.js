import React from 'react'
import {Link, useOutletContext} from 'react-router-dom'
const AdminPage = () => {
    const {products} = useOutletContext()
    console.log(products)
    return(
        <div>
            <div className='newItem'>
            <button>
                <Link className='link' to={`/addproduct`}>New Product</Link>
            </button>&nbsp;

            <button>
                <Link className='link' to={`/addcategory`}>New Category</Link>
            </button>
            </div>
            {/* <br></br> */}
            <div className='productsContainer'>
            {products && products.length ? products.map((product, idx) => {
                return(
                    <div className='adminProductsDiv' key={idx}>
                        <p>Title: {product.title}</p>
                        <p>Price: ${product.price}</p>
                        <button>
                            <Link className='link' to={`/product/delete/${product.id}`}>Delete Product</Link>
                        </button>
                        <button>
                            <Link className='link' to={`/updateproduct/${product.id}`}>Update Product</Link>
                        </button>
                    </div>
                )
            }):<p>Bad code</p>}
            </div>
        </div>
    )
}

export default AdminPage