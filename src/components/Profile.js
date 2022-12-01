import React, {useState, useEffect} from "react";

const Profile = () => {
    const [current, setCurrent] = useState()
    const [cart, setCart] = useState()
    const [past, setPast] = useState()
    

    async function getCurrentCart () {
        try{
            const data = await fetch(`http://localhost:1337/api/orders/viewcart`, 
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
            // console.log(results)
        } catch(error){
            console.log(error)
        }

        }

        async function getPastCart () {
        try{
            const data = await fetch(`http://localhost:1337/api/orders/pastcart`, 
            {
                method: "GET",
                headers : {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const results = await data.json()
            setPast(results.cart.products) 
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
            <div><h1>Current Cart:</h1>
               {/* {console.log('current', current)} */}
                {current && current.length ? current.map(el => {
                return  <div className = "productsDiv" key = {el.id}> 
                        <div className = "title">{el.title}</div>
                        <img src={el.photo} className="productImg"></img> 
                        <div className = "description">{el.description}</div>
                        <div className = "quantity">Quantity: {el.quantity}</div> 
                        <div className = "price">Price: ${el.price}</div> 
                            
                        </div>}) : "Internet Connection Not Valid"}
                        <button> Buy Cart</button> 
            </div>
            <div><h1>Past Orders:</h1>
                 {/* {console.log('past', past)} */}
                {past && past.length ? past.map(el => {
                return  <div className = "productsDiv" key = {el.id}> 
                        <div className = "title">{el.title}</div>
                        <img src={el.photo} className="productImg"></img> 
                        <div className = "description">{el.description}</div>
                        <div className = "quantity">Quantity: {el.quantity}</div> 
                        <div className = "price">Price: ${el.price}</div> 
                            
                        </div>}) : "You have no previous orders"}
            </div>            
        </div>

        
        
    )
}

export default Profile