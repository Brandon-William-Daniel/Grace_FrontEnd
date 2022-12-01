import React, {useState, useEffect} from "react";

const Cart = () => {
    const [cart, setCart] = useState()
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
        console.log(jsonCart.cart.products)
        setCart(jsonCart.cart.products)
     }
     getCart()
    }, [])
    return(
        cart ? cart.map((cart, idx) => {
            return(
                <div>
                    <div className="productsDiv"  key={idx}>
                        <div>Title: {cart.title}</div>
                        <div>Description: {cart.description}</div>
                        <div>Price: ${cart.price}</div>
                        <br></br>
                    </div>
                </div>
            )
        }): <p>Start filling your cart now!</p>
    )
}

export default Cart