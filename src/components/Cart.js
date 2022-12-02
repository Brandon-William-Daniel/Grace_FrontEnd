import React, {useState, useEffect} from "react";
import { useOutletContext, useNavigate } from "react-router";
import {useParams} from 'react-router-dom'


const Cart = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user} = useOutletContext()
    const {detailId} = useParams()
    const {products} = useOutletContext()
    const navigate = useNavigate()
    console.log(user)
    async function checkoutCart(cartId){
        console.log(cartId)
        // const checkoutFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/cart/${user.id}`, {
        //     method: "DELETE",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        // // const msg = await checkoutFetch.json()
        // if(checkoutFetch){
        //     alert('Purchased')
        //     navigate('/')
        // }
    }

    useEffect(() => {
    async function getCart(){
        const cartFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/viewcart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const jsonCart = await cartFetch.json()
        // console.log('cartFda',jsonCart.cart.cartId )
        setCart(jsonCart.cart.products)
        setCartId(json.cart.cartId)
     }
     getCart()
    }, [])

    async function removeFromCart(itemId){
        try {
            const removeFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/detail/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            // const jsonFetc = await removeFetch.json()
            console.log(removeFetch)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('this is cart', cart)
    return(
        <div>
            {cart ? cart.map((cartItm, idx) => {
                if(cartItm.active){
            return(
                <div key={idx}>
                    <div className="productsDiv">
                        <div>Title: {cartItm.title}</div>
                        <div>Description: {cartItm.description}</div>
                        <div>Quanitity: {cartItm.quantity} </div>
                        <div>Price: ${cartItm.price}</div>
                        <br></br>
                            <button onClick={() => {
                                // console.log('cart', cartItm)
                                // console.log('carti', idx)
                                removeFromCart(cartItm.id)
                            }}>Remove from cart</button>
                    </div>
                </div>
            )}
        }): <p>Start filling your cart now!</p>}
        <button onClick={() => {
            checkoutCart(cart.id)
        }}>Checkout</button>
        </div>
    )
}

export default Cart