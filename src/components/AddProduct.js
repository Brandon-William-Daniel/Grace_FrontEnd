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
    const navigate = useNavigate()
    const [user, setUser] = useState()
    
    useEffect(() => {
        async function checkAdmin(){
            const fetchData = await fetch(`https://gg-3pln.onrender.com/api/users/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const jsonData = await fetchData.json()
            if(jsonData){
                setUser(jsonData)
            }
        }
        checkAdmin()
    }, [])
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
        if(jsonFetch.product){
            alert('Product Added')
            navigate('/')
        }else{
            alert('You must be an admin user to do this')
            navigate('/')
        }
        // if(jsonFetch.newProduct){
        //     async function showAllProducts(){
        //         const prodFetch = await fetch(`https://gg-3pln.onrender.com/api/products`)
        //         const jsonProduct = await prodFetch.json();
        //         // console.log('this is updated list', jsonProduct)
        //         setProducts(jsonProduct)
        //     }
        //     showAllProducts();
        //     navigate('/')
        // }
    }
    if(user && user.isAdmin === true){
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
        )
    }else if(user.isAdmin === false){
        return(
        <div>
            <h1>Admins Only Beyond this point</h1>
        </div>
        )
    }
}

export default AddProduct