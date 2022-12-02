import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DeleteProduct = () => {
    const {productid} = useParams()
    const navigate = useNavigate()
    async function deleteProduct(event){
        event.preventDefault();
        try{
        const delFetch = await fetch(`https://gg-3pln.onrender.com/api/products/deleteproduct/${productid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const jsonDel = await delFetch.json();
        if(jsonDel){
            alert('Product Deleted')
            navigate('/')
        }
    } catch(error){
        console.log(error)
    }
    }
    return(
        <div>
            <form onSubmit={deleteProduct}>
                <label>Are you Sure you want to delete this product?</label>
                <br></br>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default DeleteProduct