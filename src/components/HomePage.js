import React, {useState, useEffect} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState();
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

    async function logout(){
        localStorage.removeItem("token")
        alert('You have succesfully logged out')
        navigate("/Login")
        
    }

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
            <h1>Do we want text that goes page to page and is consistent?</h1>
            <Outlet context={{products}}/>
            <footer id="footer">
               Footer that will be at bottom of page: copyright stuff
            </footer>
        </div>
    )
}

export default Homepage