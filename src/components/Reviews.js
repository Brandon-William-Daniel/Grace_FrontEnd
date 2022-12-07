import React, {useState, useEffect} from "react";
import { useParams, useOutletContext } from "react-router-dom"
import DeleteReview from "./DeleteReview";
import UpdateReview from "./UpdateReview";

const Reviews = () => {
    const [reviews, setReviews] = useState();
    const {id} = useParams()
    const {user} = useOutletContext()
    // console.log("this is to see if we get id:", id)
    useEffect(() => {
        async function getReviewsByProduct(){
            const getReviewsFetch = await fetch(`https://gg-3pln.onrender.com/api/reviews/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const reviewJSON = await getReviewsFetch.json()
            // console.log("These are the reviews", reviewJSON.allReviews)
            setReviews(reviewJSON.allReviews)

        }
        getReviewsByProduct();
        // console.log("useState reviews data", reviews)
    }, [])
    
    return(
        reviews ? reviews.map((review, idx) => {
            return(
                <div className="reviewDiv" key={idx}>
                <div>
                    <p><b>Title</b></p>
                        <p>{review.title}</p>
                    <p><b>Description:</b></p>
                        <p>{review.description}</p>
                    {review.userId === user.id ? <UpdateReview /> : <p></p> }
                    {review.userId === user.id ? <DeleteReview /> : <p></p> }
                </div>
                </div>
            )
        }):<p>No Reviews</p>
    )
}

export default Reviews