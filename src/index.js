import React from "react";
import ReactDOM from "react-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Errorpage from "./components/Errorpage"
import LandingPage from "./components/LandingPage";
import Homepage from "./components/HomePage";
import Products from "./components/Products";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import Register from "./components/Register";
import ProductDetails from "./components/ProductDetails";
import Profile from "./components/Profile";
import DeleteCart from "./components/DeleteCart";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";
import DeleteReview from "./components/DeleteReview";
import CatagoryProd from "./components/CatagoryProd";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";

import "./style.css"
import Checkout from "./components/Checkout";
import AdminPage from "./components/AdminsPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <Errorpage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:id",
                element: <ProductDetails />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/deletecart",
                element: <DeleteCart />
            },
            {
                path: "/addcategory",
                element: <AddCategory />
            },
            {
                path: "/addproduct",
                element: <AddProduct />
            },
            {
                path: "/reviews/:id",
                element: <Reviews />
            },
            {
                path: "/addreview/:id",
                element: <AddReview />
            },
            {
                path: "/deletereview",
                element: <DeleteReview />
            },
            {
                path: "/product/catagory/:catId",
                element: <CatagoryProd />
            },
            {
                path: "/product/delete/:productid",
                element: <DeleteProduct />
            },
            {
                path: "/updateproduct/:productid",
                element: <UpdateProduct />
            },
            {
                path: "/cart/checkout",
                element: <Checkout />
            },
            {
                path: "/admins",
                element: <AdminPage />
            }
        ]
    }
])

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("app"))