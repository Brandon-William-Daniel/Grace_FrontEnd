import React from 'react'
import {Link, useOutletContext} from 'react-router-dom'
const AdminPage = () => {
    const {products} = useOutletContext()
    const {user} = useOutletContext()
    // console.log(products)
    if(user && user.isAdmin){
    return(
        <div>
            <button>
                <Link to={`/addproduct`}>New Product</Link>
            </button>

            <button>
                <Link to={`/addcategory`}>New Category</Link>
            </button>
            <button>
                <Link to={`/allusers`}>Users</Link>
            </button>
            <br></br>
            {products && products.length ? products.map((product, idx) => {
                return(
                    <div className='productsDiv' key={idx}>
                        <p>Title: {product.title}</p>
                        <p>Price: ${product.price}</p>
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
    )}else{
        return(
            <div>
                <h1>Admins only beyong this point</h1>
            </div>
        )
    }
}

export default AdminPage