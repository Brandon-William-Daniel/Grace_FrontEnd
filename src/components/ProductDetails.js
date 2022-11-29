import React, {useState, useEffect} from "react";
import { useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {
    const {id} = useParams()
    // console.log('this is id', id)
    const [singleProduct, setSingleProduct] = useState()
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        async function getSinlgeProduct(){
            const singleProductFetch = await fetch(`https://gg-3pln.onrender.com/api/products/${id}`, {
                method: 'GET'
            })
            const singleJSON = await singleProductFetch.json();
            // console.log('this is a single product', singleJSON.product)
            setSingleProduct(singleJSON.product)
            if(singleJSON){
                setFlag(true)
            }
        }
        getSinlgeProduct()
        // console.log(singleProduct)
    }, [flag])
    // console.log(flag)
    // I am very proud of this flag system
    if(flag === true && singleProduct.active){
        return(
            <div>
                <div>
                    <p>{singleProduct.title}</p>
                </div>
                <div>
                    <p>{singleProduct.description}</p>
                </div>
                <div>
                    <p>{singleProduct.price}</p>
                </div>
                <div>
                    <img src={singleProduct.photo}></img>
                </div>
                <button>Add product to cart!</button>
            </div>
        )
    } else{
        <p>loading data</p>
    }
}

export default ProductDetails