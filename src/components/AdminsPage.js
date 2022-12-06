import React from 'react'
import {Link, useOutletContext} from 'react-router-dom'
const AdminPage = () => {
    const {products} = useOutletContext()
    console.log(products)
    return(
        <div>
            <button>
                <Link to={`/addproduct`}>New Product</Link>
            </button>

            <button>
                <Link to={`/addcategory`}>New Category</Link>
            </button>
            <br></br>
            {products && products.length ? products.map((product, idx) => {
                return(
                    <div className='productsDiv' key={idx}>
                        <p>Title: {product.title}</p>
                        <p>Price: {product.price}</p>
                        <button>
                            <Link to={`/product/delete/${product.id}`}>Delete Product</Link>
                        </button>
                        <button>
                            <Link to={`/updateproduct/${product.id}`}>Update Product</Link>
                        </button>
                    </div>
                )
            }):<p>Bad code</p>}
        </div>
    )
}

export default AdminPage