import React, {useState, useEffect} from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router'


const Checkout = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user} = useOutletContext()
    const navigate = useNavigate()
    const [cc, setCC] = useState()
    const [cvv, setCVV] = useState()
    // console.log(user)

    async function saveCC(){
        const ccFetch = await fetch(`` , {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: {
                cc,
                cvv
            }
        })

    }

    async function checkoutCart(cartId){
        // console.log(cartId)
        const checkoutFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/cart/${cartId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        // console.log(checkoutFetch)
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
        <div className='checkoutContainer'>
            <p>Ship TO: {user.address}</p>
            <form className='ccForm'>
                <label>Credit Card</label>
                <input type='number' value={cc} onChange={(event) => {
                    console.log(event.target.value)
                    setCC(event.target.value)
                }}></input>
                <label>CVV</label>
                <input type='number' value={cvv} onChange={(event) => {
                    setCVV(event.target.value)
                }}></input>
            </form>
            <button onClick={() => {
                checkoutCart(cartId)
            }}>Checkout</button>
        </div>
    )
}


export default Checkout