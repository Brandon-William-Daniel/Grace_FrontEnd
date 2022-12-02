import React, {useState, useEffect} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"


const Homepage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        async function getAllProducts(){
            const getProducts = await fetch('https://gg-3pln.onrender.com/api/products', {
                method: 'GET'
            })
            const jsonProd = await getProducts.json();
            // console.log('this is json ', jsonProd.products)
            setProducts(jsonProd.products)
        }
        getAllProducts();
        
       

    }, [])

    const getUser = async()=> {
        try{

            const data = await fetch('https://gg-3pln.onrender.com/api/users/me', 
            {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const getUser = await data.json()
          if(!getUser.username){
            setUser()
          }
            setUser(getUser)
        }catch(error){
            console.log(error)
        } 
    }
    
    useEffect(() =>{     
        getUser()
    },[])
    

    async function logout(){
        localStorage.removeItem("token")
        getUser()
        alert('You have succesfully logged out')
        navigate("/Login")
        
    }

console.log(user)
    

    return(
        <div>
            <header>
                <nav>
                    <Link className="navLink" to="/">Home</Link>&nbsp;
                    <Link className="navLink" to="/products">Products</Link>&nbsp;
                    <Link className="navLink" to="/login">Login</Link>&nbsp;
                    <a className = "navLink" onClick={()=> {logout()}}>Logout</a>&nbsp;
                    <Link className="navLink" to="/categories">Categories</Link>&nbsp;
                    <Link className="navLink" to="/cart">View Cart</Link>&nbsp;
                    <Link className="navLink" to="/profile">Profile</Link>
                </nav>
            </header>

            { user && user.username ? <h1>Welcome {`${user.username}`}</h1>: <h1>Welcome Guest!</h1>}
            <Outlet context={{products, user, getUser, setProducts} }/>

            <footer id="footer">
               Footer that will be at bottom of page: copyright stuff
            </footer>
        </div>
    )
}

export default Homepage