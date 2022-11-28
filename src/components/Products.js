import React, {useState, useEffect} from "react";
// View all products
const Products = () => {
    const [products, setProducts] = useState();
    useEffect(() => {
        async function getAllProducts(){
            const getProducts = await fetch('https://gg-3pln.onrender.com/api/products')
            const jsonProd = await getAllProducts.json();
            console.log('this is json ', jsonProd)
        }
        getAllProducts();
    }, [])
    return(
        <div>
            <h3>These are our products</h3>
        </div>
    )
}

export default Products