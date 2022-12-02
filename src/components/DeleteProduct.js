import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DeleteProduct = () => {
    const {productid} = useParams()
    const [singleProd, setSingleProd] = useState()
    const [flag, setFlag] = useState(false);
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

    useEffect(() => {
        async function getSingleProd(){
            const prodFetch = await fetch(`https://gg-3pln.onrender.com/api/products/${productid}`)
            const singleJson = await prodFetch.json()
            setSingleProd(singleJson.product)
            if(singleJson){
                setFlag(true)
            }
        }
        getSingleProd()
    }, [flag])
    if(flag === true && singleProd.active){
        return(
            <div>
                <form onSubmit={deleteProduct}>
                    <label>Are you Sure you want to delete this product?</label>
                    <p>{singleProd.title}</p>
                    <br></br>
                    <img src={singleProd.photo}></img>
                    <br></br>
                    <input type='submit'></input>
                </form>
            </div>
        )
    } else{
        <p>Loading Data</p>
    }
}

export default DeleteProduct