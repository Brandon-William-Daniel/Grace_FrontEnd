import React, {useState} from "react"
import { useParams } from "react-router-dom"

const UpdateReview = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {id, userId} = useParams()
    console.log("This is the product id:", id)
    console.log("This is the user id:", userId)
    
    function changeTitle (event) {
        setTitle(event.target.value)
    }

    function changeDescription (event) {
        setDescription(event.target.value)
    }

    async function updateReview(event) {
        event.preventDefault()
        try {
            const updateReviewFetch = await fetch (`https://gg-3pln.onrender.com/api/reviews/updatereview/${id}/3`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            })
            const updateData = updateReviewFetch.json()
            console.log("this is the review data", updateData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="updateContainer">
            <h3>Update Review</h3>
                <form onSubmit={updateReview}>
                    <div className="updateTitle">
                        <div>Update Title</div>
                        <input type="text" value={title} onChange={changeTitle}></input>
                    </div>
                    <div className="updateDescription">
                        <div>Update Description</div>
                        <input type="text" value={description} onChange={changeDescription}></input>
                    </div> 
                    <div className="updateReview">
                        <button type="submit">Update</button>       
                    </div>   
                </form>
        </div>
    )
}

export default UpdateReview