import React from 'react'
import { json, useParams } from 'react-router'

const DeleteProduct = () => {
    async function deleteProduct(){
        try{
        const {productid} = useParams()
        const delFetch = await fetch(`https://gg-3pln.onrender.com/api/products/deleteproduct/${productid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const jsonDel = await delFetch.json();
        if(jsonDel){
            console.log('DELETED')
        }
    } catch(error){
        console.log(error)
    }
    }
    return(
        <div>
            <h3>Are you sure you want to delete this product?</h3>
        </div>
    )
}