import React, {useState, useEffect} from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router'


const Checkout = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user} = useOutletContext()
    const {detailId} = useParams()
    const {products} = useOutletContext()
    const navigate = useNavigate()
    console.log(user)

    async function checkoutCart(cartId){
        console.log(cartId)
        const checkoutFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/cart/${cartId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(checkoutFetch)
        if(checkoutFetch){
            console.log('done')
            alert('Purchase Done')
            navigate('/')
        }
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
        setCartId(jsonCart.cart.cartId)
     }
     getCart()
    }, [])


    return(
        <div>
            <form>
                <label>Credit Card</label>
                <input type='number'></input>
                <label>CVV</label>
                <input type='number'></input>
            </form>
            <button onClick={() => {
                checkoutCart(cartId)
            }}>Checkout</button>
        </div>
    )
}


export default Checkout