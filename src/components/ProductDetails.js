import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext, useParams } from "react-router-dom";
import Reviews from "./Reviews";
import AddReview from "./AddReview";


const ProductDetails = () => {
    const {id} = useParams()
    // console.log('this is id', id)
    const navigate = useNavigate()
    const [singleProduct, setSingleProduct] = useState()
    const [quantity, setQuantity] = useState(1)
    const [flag, setFlag] = useState(false);

    async function addProdToCart(event){
        event.preventDefault();
        try {
            const testFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/orderdetails/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify ({
                    quantity
                })
            })
            const tJson = await testFetch.json();
            if(tJson){
                console.log('added to cart')
            }
            if(tJson){
                alert('Added product to cart!')
                navigate('/products')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

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
                <div className="detailContainer">
                    <div className="productDetails">
                        <div>
                            <p>{singleProduct.title}</p>
                        </div>
                        <div>
                            <p>{singleProduct.description}</p>
                        </div>
                        <div>
                            <p>${singleProduct.price}</p>
                        </div>
                    
                        <div>
                            <img src={singleProduct.photo}></img>
                        </div>
                        {/* <form onSubmit={addProdToCart}>
                            <label>Quantity:</label>
                            <input type='number' value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></input>
                            <button type='submit'>Add to Cart</button>
                        </form>  */}
                    </div>    
                    <div className="reviewDetails">
                    <form className="addCart" onSubmit={addProdToCart}>
                            <label>Quantity:</label>
                            <input className="cartQuantity" type='number' value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></input>
                            <button type='submit'>Add to Cart</button>
                        </form> 
                        <div><h4>Customer Reviews</h4></div>
                        <Reviews />
                        <AddReview />
                        {/* <form className="addCart" onSubmit={addProdToCart}>
                            <label>Quantity:</label>
                            <input className="cartQuantity" type='number' value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></input>
                            <button type='submit'>Add to Cart</button>
                        </form>  */}
                    </div>
                </div>

            </div>
        )
    } else{
        <p>loading data</p>
    }
}

export default ProductDetails