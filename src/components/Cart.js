import React, {useState, useEffect} from "react";
import { useOutletContext, useNavigate } from "react-router";
import {useParams, Link} from 'react-router-dom'


const Cart = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user} = useOutletContext()
    const {detailId} = useParams()
    const {products} = useOutletContext()
    const navigate = useNavigate()
    // console.log(user)

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
        setCartId(jsonCart.cart.cartId)
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
            // console.log(removeFetch)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('this is cart', cart)
    return(
        <div>
            {cart && cart.length ? cart.map((cartItm, idx) => {
                console.log(cartItm, 'cartItm')
                console.log(cart, "cart")
                if(cartItm.active){
            return(
                <div className="cartItems" key={idx}>
                    <div className="cartDiv">
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
        }): <p className="cartDefault">Start filling your cart now!</p>}
        <div className="cartButton">
        <button>
            <Link className="checkout" to={'/cart/checkout'}>Checkout</Link>
        </button>
        </div>
        </div>
    )
}

export default Cart