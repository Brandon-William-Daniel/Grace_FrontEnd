import React, {useState, useEffect} from "react";

const Cart = () => {
    const [cart, setCart] = useState()
    async function checkoutCart(){
        const checkoutFetch = await fetch()
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
        console.log(jsonCart.cart.products)
        setCart(jsonCart.cart.products)
     }
     getCart()
    }, [])

    async function removeFromCart(event){
        event.preventDefault();
        try {
            const removeFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/detail/${cart.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const jsonFetc = await removeFetch.json()
            console.log(jsonFetc)
        } catch (error) {
            console.log(error)
        }
    }
    console.log('this is cart', cart)
    return(
        <div>
            {cart ? cart.map((cart, idx) => {
                if(cart.active){
            return(
                <div key={idx}>
                    <div className="productsDiv">
                        <div>Title: {cart.title}</div>
                        <div>Description: {cart.description}</div>
                        <div>Quanitity: {cart.quantity} </div>
                        <div>Price: ${cart.price}</div>
                        <br></br>
                        <form onSubmit={removeFromCart}>
                            <button type='submit' onClick={() => {
                                console.log('cart', cart)
                            }}>Remove from cart</button>
                        </form>
                    </div>
                </div>
            )}
        }): <p>Start filling your cart now!</p>}
        <button>Checkout</button>
        </div>
    )
}

export default Cart