import React, {useState, useEffect} from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router'


const Checkout = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user} = useOutletContext()
    const navigate = useNavigate()
    const [creditCard, setCC] = useState()
    const [cvv, setCVV] = useState()


    async function checkoutCart(cartId){
        try {
            const data = await fetch(`https://gg-3pln.onrender.com/api/users/credit`, {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },body: JSON.stringify({
                    creditCard
                  })
                
            })

            const checkoutFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/cart/${cartId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            
            
            const results = await data.json()
            console.log(results)
            if( !results.name){
                console.log('done')
                alert('Purchase Done')
                navigate('/')
            }
            
        } catch (error) {
            console.log(error)
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
                <input type='number' value={creditCard} onChange={(event) => {
                    
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