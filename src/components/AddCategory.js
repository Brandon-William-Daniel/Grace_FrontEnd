import React, { useState } from "react";
import { useOutletContext } from "react-router";

const AddCategory = () => {
  const [catagoryName, setCatagoryName] = useState();
  const { user } = useOutletContext();
  async function createcatagory(event) {
    event.preventDefault();
    // Matt: for organization, you chould move all fetch functions into the api folder
    const newCatFetch = await fetch(
      `https://gg-3pln.onrender.com/api/catagories/newcatagory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          catagoryName,
        }),
      }
    );
    const jsonCatFetch = await newCatFetch.json();
    console.log(jsonCatFetch);
  }
  if (user && user.isAdmin) {
    return (
      <div>
        <h3>Create A New Cataogry Here!</h3>
        <form onSubmit={createcatagory}>
          <label>Catagory Name:</label>
          <input
            type="text"
            value={catagoryName}
            onChange={(event) => {
              setCatagoryName(event.target.value);
            }}
          ></input>
          <br></br>
          <input type="submit"></input>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Admins only beyond this point</h1>
      </div>
    );
  }
};

export default AddCategory;
