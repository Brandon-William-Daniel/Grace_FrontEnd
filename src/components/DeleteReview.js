import React from "react";
import { useParams, useOutletContext } from "react-router-dom"

const DeleteReview = () => {
    const {id} = useParams()
    const {user} = useOutletContext()
    console.log("This is the delete review product id:", id)
    console.log("This is the delete user id:" , user.id)
    async function deleteReview() {
        try {
            const deleteReviewFetch = await fetch (`https://gg-3pln.onrender.com/api/reviews/deletereview/${id}/${user.id}`, {
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