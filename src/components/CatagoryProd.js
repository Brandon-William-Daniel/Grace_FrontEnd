import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {Link, useOutletContext} from 'react-router-dom'

const CatagoryProd = () => {
    const [catProd, setCatProd] = useState();
    const {catId} = useParams()
    useEffect(() => {
        async function getSpecifcProds(){
            const prodFetch = await fetch(`https://gg-3pln.onrender.com/api/products/catagory/${catId}`, {
                method: 'Get'
            })
            const jsonFetch = await prodFetch.json();
            console.log(jsonFetch.products)
            setCatProd(jsonFetch.products)
        }
        getSpecifcProds()
    }, [])
    async function addProdToCart(event){
        event.preventDefault();
        try {
            const testFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/orderdetails/${item.id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify ({
                    quantity
                })
            })
            const tJson = await testFetch.json();
            if(tJson){
                console.log('added to cart')
            }
            if(tJson){
                alert('Added product to cart!')
                navigate('/products')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    return(
        catProd ? catProd.map((item, idx) => {
            return(
                <div className="productsDiv" key={idx}>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <img src={item.photo} className="productImg"></img>
                    <br></br>
                    <button>
                        <Link to={`/products/${item.id}`}>INFO</Link>
                    </button>
                </div>
            )
        }):<p>Filler</p>
    )
}

export default CatagoryProd