import React, {useState} from "react";

const Cart = () => {
    const [cart, setCart] = useState()
    async function getCart(){
        const cartFetch = await fetch(`https://gg-3pln.onrender.com/api/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const jsonCart = await cartFetch.json()
        console.log(jsonCart)
     }
     getCart()
    return(
        <div>
            <h3>Checkout Here!</h3>
        </div>
    )
}

export default Cart