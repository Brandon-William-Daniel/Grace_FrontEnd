import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"

const AddReview = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {id} = useParams()
    // console.log("This is productid", id)
    
    async function addNewReview(event){
        event.preventDefault();
        try {
            if(!localStorage.getItem('token')) {
                alert("You must have an account to leave a review")
                return
            }
            const addReviewFetch = await fetch(`https://gg-3pln.onrender.com/api/reviews/${id}/newreview`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    description
                })
            })
            const reviewData = await addReviewFetch.json()
            console.log("this is the review data", reviewData)
        } catch (error) {
            console.log(error)
        }
    }
    

    function updateTitle(event) {
        setTitle(event.target.value)
    }

    function updateDescription(event) {
        setDescription(event.target.value)
    }

    return(
        <div className="reviewDiv">
            <h3>Add a review to a product</h3>
                <form onSubmit={addNewReview}>
                    <div className="reviewTitle">
                        <div>Review Title: </div>
                        <input onChange={updateTitle} value={title} type="text"></input>
                    </div>
                    <div className="reviewDescription">
                        <div>Review Description: </div>
                        <input onChange={updateDescription} value={description} type="textarea"></input>
                    </div>
                    <div className="submitReview">
                        <button type="submit">Add Review</button>
                    </div>
                </form>
        </div>
    )
}

export default AddReview