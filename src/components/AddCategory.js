import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
const AddCategory = () => {
    const [catName, setCatName] = useState()
    const {user} = useOutletContext()
    const [cat, setCat] = useState()
    const navigate = useNavigate()
    async function createcatagory(event){
        event.preventDefault();
        const newCatFetch = await fetch(`https://gg-3pln.onrender.com/api/catagories/newcatagory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                catName
            })
        })
        console.log(newCatFetch)
        if(newCatFetch){
            async function getAllCat(){
                const catFetch = await fetch(`https://gg-3pln.onrender.com/api/catagories`)
                const jsonFetch = await catFetch.json()
                setCat(jsonFetc)
            }
            getAllCat()
            alert('Catagory Created')
            navigate('/categories')
        }
    }
    if(user && user.isAdmin){
    return(
        <div>
            <h3 className="newCategoryHeader">Create A New Cataogry Here!</h3>
            <div className="addCategoryContainer">
            <form onSubmit={createcatagory}>
                <div>
                    <label>Catagory Name:</label>
                </div>
                <input type='text' value={catName} onChange={(event) => {
                    setCatName(event.target.value)
                }}></input>
                <br></br>
                <input className="submit" type='submit'></input>
            </form>
            </div>
        </div>
    )}else{
        return(
        <div>
            <h1>Admins only beyond this point</h1>
        </div>
        )
    }
}

export default AddCategory