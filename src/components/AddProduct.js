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
                <h3>Create a new product here!</h3>
                <form onSubmit={newProduct}>
                    <label>Title:</label>
                    <input type='text' value={title} onChange={(event) => {
                        console.log(event.target.value)
                        setTitle(event.target.value)
                    }}></input>
                    <br></br>
                    <label>Description:</label>
                    <input type='text' value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }}></input>
                    <br></br>
                    <label>Price:</label>
                    <input type='number' value={price} onChange={(event) => {
                        setPrice(event.target.value)
                    }}></input>
                    <br></br>
                    <label>invQty:</label>
                    <input type='number' value={invQty} onChange={(event) => {
                        setInvQty(event.target.value)
                    }}></input>
                    <br></br>
                    <label>Photo URL:</label>
                    <input type='text' value={photo} onChange={(event) => {
                        setPhoto(event.target.value)
                    }}></input>
                    <br></br>
                    <label>Catagory ID:</label>
                    <input type='number' value={cat} onChange={(event) => {
                        setCat(event.target.value)
                    }}></input>
                    <br></br>
                    <label>Active?</label>
                    <button onClick={() => {setActive(true)}}>True</button><button onClick={() => {setActive(false)}}>False</button>
                    <br></br>
                    <input type='submit'></input>
                </form>
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