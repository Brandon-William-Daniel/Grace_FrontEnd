import React, {useState, useEffect} from "react";
import {Link, useOutletContext} from 'react-router-dom'

const Categories = () => {
    const [cat, setCat] = useState()

    useEffect(() => {
        async function getCat(){
            const catFetch = await fetch(`https://gg-3pln.onrender.com/api/catagories`, {
                method: 'GET'
            })
            const jsonFetch = await catFetch.json();
            console.log(jsonFetch.cat)
            setCat(jsonFetch.cat)
        }
        getCat()
    }, [])
    return(
      cat ? cat.map((cat, idx) => {
        return(
            <div className="productsDiv" key={idx}>
                <p>{cat.catName}</p>
                <button>
                    <Link to={`/product/catagory/${cat.id}`}>See all products of this catagory</Link>
                </button>
            </div>
        )
      }):<p>No Catagories to show</p>
    )
}

export default Categories