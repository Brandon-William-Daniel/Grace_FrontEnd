import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useOutletContext } from "react-router-dom";

const CatagoryProd = () => {
  const [catProd, setCatProd] = useState();
  const { catId } = useParams();
  useEffect(() => {
    async function getSpecifcProds() {
      // Matt: nice work with categories. its a lot better
      // to fetch by category like you have, rather than
      // filtering on the frontend
      const prodFetch = await fetch(
        `https://gg-3pln.onrender.com/api/products/catagory/${catId}`,
        {
          method: "Get",
        }
      );
      const jsonFetch = await prodFetch.json();
      console.log(jsonFetch.products);
      setCatProd(jsonFetch.products);
    }
    getSpecifcProds();
  }, []);
  return catProd ? (
    catProd.map((item, idx) => {
      return (
        <div className="productsDiv" key={idx}>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <img src={item.photo} className="productImg"></img>
          <br></br>
          <button>
            <Link to={`/products/${item.id}`}>INFO</Link>
          </button>
        </div>
      );
    })
  ) : (
    <p>Filler</p>
  );
};

export default CatagoryProd;
