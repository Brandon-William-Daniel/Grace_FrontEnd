import React, {useState} from "react";

const AddCategory = () => {
    const [catagoryName, setCatagoryName] = useState()
    async function createcatagory(event){
        event.preventDefault();
        const newCatFetch = await fetch(`https://gg-3pln.onrender.com/api/catagories/newcatagory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                catagoryName
            })
        })
        const jsonCatFetch = await newCatFetch.json()
        console.log(jsonCatFetch)
    }
    return(
        <div>
            <h3>Create A New Cataogry Here!</h3>
            <form onSubmit={createcatagory}>
                <label>Catagory Name:</label>
                <input type='text' value={catagoryName} onChange={(event) => {
                    setCatagoryName(event.target.value)
                }}></input>
                <br></br>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default AddCategory