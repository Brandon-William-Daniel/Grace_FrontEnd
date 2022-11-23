import React from "react";
import { Outlet, Link } from "react-router-dom"

const Homepage = () => {
    return(
        <div>
            <header>
                <nav>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/products">Products</Link>&nbsp;
                    <Link to="/login">Login</Link>&nbsp;
                    <Link to="/logout">Logout</Link>&nbsp;
                    <Link to="/categories">Categories</Link>&nbsp;
                    <Link to="/cart">View Cart</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                </nav>
            </header>
            <h1>Do we want text that goes page to page and is consistent?</h1>
            <Outlet />
            <footer>
               Footer that will be at bottom of page: copyright stuff
            </footer>
        </div>
    )
}

export default Homepage