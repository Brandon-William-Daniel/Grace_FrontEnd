import React, {useState, useEffect} from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router'


const Checkout = () => {
    const [cart, setCart] = useState()
    const [cartId, setCartId] = useState()
    const {user, getUser} = useOutletContext()
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

            console.log(checkoutFetch)
            
            const results = await data.json()
            console.log(results)
            console.log(checkoutFetch)
            if( !results.name){
                console.log('done')
                alert('Purchase Done')
                getUser()
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

        <div className='checkoutContainer'>
            <p>Ship TO: {user.address}</p>
            <form className='ccForm'>

       
                <label>Credit Card</label>
                <input type='number' value={creditCard} onChange={(event) => {
                    
                    setCC(event.target.value)
                }}></input>
                <label>CVV</label>
                <input type='number' value={cvv} onChange={(event) => {
                    setCVV(event.target.value)
                }}></input>
                <label>Address:</label>
                <input placeholder={user.address} type='text'></input>
            </form>
            <button onClick={() => {
                checkoutCart(cartId)
            }}>Checkout</button>
        </div>
    )
}


export default Checkout