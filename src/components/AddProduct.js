import React, {useState, useEffect} from "react";
import { useNavigate, useOutletContext } from "react-router";

const AddProduct = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [invQty, setInvQty] = useState()
    const [photo, setPhoto] = useState();
    const [cat, setCat] = useState();
    const [active, setActive] = useState(true);
    const {user} = useOutletContext()
    const {setProducts} = useOutletContext()
    const navigate = useNavigate()

    async function newProduct(event){
        event.preventDefault();
        const prodFetch = await fetch(`https://gg-3pln.onrender.com/api/products/newproduct`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,description,price,invQty,photo,cat,active
            })
        })
        const jsonFetch = await prodFetch.json();
        console.log('jsonFetch,', jsonFetch)
        if(jsonFetch.newProduct){
            // console.log('here')
            async function getAllProds(){
                const fetchData = await fetch(`https://gg-3pln.onrender.com/api/products`, {
                    method: "GET"
                })
                const jsonData = await fetchData.json()
                console.log('data', jsonData)
                setProducts(jsonData.products)
            }
            getAllProds()
            alert('Product created')
            navigate('/products')
        }
    }
    if(user && user.isAdmin){
        return(
            <div>
                <h3 className="newProductHeader">Create a new product here!</h3>
                <div className="addProductContainer">
                <form onSubmit={newProduct}>
                    <div className="TypingInput">
                    <div><label>Title:</label></div>
                    <input type='text' value={title} onChange={(event) => {
                        console.log(event.target.value)
                        setTitle(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div className="TypingInput">
                    <div><label>Description:</label></div>
                    <input type='text' value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div className="TypingInput">
                    <div><label>Price:</label></div>
                    <input type='number' value={price} onChange={(event) => {
                        setPrice(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div className="TypingInput">
                    <div><label>invQty:</label></div>
                    <input type='number' value={invQty} onChange={(event) => {
                        setInvQty(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div className="TypingInput">
                    <div><label>Photo URL:</label></div>
                    <input type='text' value={photo} onChange={(event) => {
                        setPhoto(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div className="TypingInput">
                    <div><label>Catagory ID:</label></div>
                    <input type='number' value={cat} onChange={(event) => {
                        setCat(event.target.value)
                    }}></input></div>
                    <br></br>
                    <div>
                    <label>Active?</label>
                    </div>
                    <button onClick={() => {setActive(true)}}>True</button>&nbsp;<button onClick={() => {setActive(false)}}>False</button>
                    <br></br>
                    <input className="submit" type='submit'></input>
                </form>
                </div>
            </div>
        )} else{
            return(
                <div>
                    <h1>Admins only beyong this point</h1>
                </div>
            )
        }
}

export default AddProduct