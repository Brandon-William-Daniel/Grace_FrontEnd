import React, {useState, useEffect} from "react";
import {useOutletContext, Link} from 'react-router-dom';
import Cart from "./Cart";


const Profile = () => {
    const [current, setCurrent] = useState()
    const [pastItem, setPastItem] = useState()
    const [cart, setCart] = useState()
    const [pastCart, setPastCart] = useState()
    const {user} = useOutletContext();
    

    async function getCurrentCart () {
        try{
            const data = await fetch(`https://gg-3pln.onrender.com/api/orders/viewcart`, 
            {
                method: "GET",
                headers : {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const results = await data.json()
           
            setCurrent(results.cart.products)
            setCart(results.cart)
          
        } catch(error){
            console.log(error)
        }

    }

        async function getPastCart () {
        try{
            const data = await fetch(`https://gg-3pln.onrender.com/api/orders/pastcart`, 
            {
                method: "GET",
                headers : {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const results = await data.json()
            console.log('pastCart', results.cart)
            console.log('pastItem', results.cart.products)
            setPastItem(results.cart.products)
            setPastCart(results.cart) 
            // console.log(results)
        } catch(error){
            console.log(error)
        }

    }     
           
    useEffect(() => {  
            getCurrentCart();
            getPastCart(); 
        }, [])

        
    return(
         
            <div className = "mainPage"><h1>Profile</h1>
             <div>
                {user && user.username ?
                <div className="profileInfo"> 
                    <h3>Username: {`${user.username}`}</h3>
                    <h3>Email: {`${user.email}`}</h3>
                    <h3>Current Ship To Address: {`${user.address}`}</h3>
                    {user.isAdmin? <button><Link className="link" to={`/admins`}>Admin Page</Link></button> : "" } 
                </div>: 'Must login or register to continue'}
            
            </div>
            <div><h1>Current Cart - Total: ${ cart ? `${cart.total}` : '0'} </h1>
            <div className="currentCart">
            <Cart/>
            </div>

            </div>

            <div><h1>Past Orders:</h1>
                    
                 

                {pastCart && pastCart.length ? pastCart.map(pastCart =>{
                    return <div key={pastCart.cartId}>
                        {console.log('cartId', pastCart.cartId)}
                        <div>{pastCart.total}</div>
                {pastItem ? pastItem.map(el => {
                return  <div className = "productsDiv" key = {el.id}> 
                        <div className = "title">{el.title}</div>
                        <img src={el.photo} className="productImg"></img> 
                        <div className = "description">{el.description}</div>
                        <div className = "quantity">Quantity: {el.quantity}</div> 
                        <div className = "price">Price: ${el.price}</div> 
                            
                        </div>}) : "You have no past orders"}
                       </div>}) : "You have no previous orders"}
            </div>             
        </div>
       
    )
}

export default Profile