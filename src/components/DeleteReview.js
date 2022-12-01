import React from "react";
import { useParams } from "react-router-dom"

const DeleteReview = () => {
    const {id, userId} = useParams()
    console.log("This is the product id:", id)
    console.log("This is the user id:" , userId)
    async function deleteReview() {
        try {
            const deleteReviewFetch = await fetch (`https://gg-3pln.onrender.com/api/reviews/deletereview/${id}/3`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const deleteData = await deleteReviewFetch.json()
            console.log("this is the delete data:", deleteData)
        } catch (error) {
            console.log(error)
        }

    }
    return(
        <div>
            <button type="submit" onClick={deleteReview}>Delete this Review</button>
        </div>
    )
}

export default DeleteReview