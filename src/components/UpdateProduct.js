import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
// NEED TO ADD TO ROUTER TO TEST
const UpdateProduct = () => {
    const {productid} = useParams()
    // console.log(productid)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [invQty, setInvQty] = useState()
    const [photo, setPhoto] = useState();
    const [cat, setCat] = useState();
    const [active, setActive] = useState();

    async function updateProduct(event){
        event.preventDefault();
        const updateFetch = await fetch(`https://gg-3pln.onrender.com/api/products/updateproduct/${productid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,description,price,invQty,photo,cat,active
            })
        })
        const jsonFetch = await updateFetch.json();
        console.log(jsonFetch)
    }
    return(
        <div>
            <h3>Update Product Here</h3>
            <form onSubmit={updateProduct}>
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
}

export default UpdateProduct;