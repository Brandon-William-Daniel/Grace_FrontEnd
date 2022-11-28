import React, {useState, useEffect} from "react";
// View all products
const Products = () => {
    const [products, setProducts] = useState();
    useEffect(() => {
        async function getAllProducts(){
            const getProducts = await fetch('https://gg-3pln.onrender.com/api/products')
            const jsonProd = await getProducts.json();
            console.log('this is json ', jsonProd.products)
            setProducts(jsonProd.products)
        }
        getAllProducts();
    }, [])
    return(
        products ? products.map((product) => {
            return(
                <div>
                <div>
                    <p>Name: {product.title}</p>
                </div>
                <div>
                    <p>description: {product.description}</p>
                </div>
                <div>
                    <p>price: {product.price}</p>
                </div>
                <div>
                    <img src={product.photo}></img>
                </div>
                </div>
            )
        }):<p>Nothing to show</p>
    )
}

export default Products