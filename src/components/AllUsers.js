import React, {useState, useEffect} from 'react'
import { json, useOutletContext } from 'react-router'

const AllUsers = () => {
    const {user} = useOutletContext()
    const [allUsers, setAllUsers] = useState()
    async function makeAdmin(userId){
        const makeFetch = await fetch(`https://gg-3pln.onrender.com/api/users/isadmin/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                boolean: true
            })
        })
        console.log(makeFetch)
        if(makeFetch){
            alert('User is now admin')

        }
    }

    useEffect(() => {
        async function getUsers(){
            const userFetch = await fetch(`https://gg-3pln.onrender.com/api/users/admin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            const jsonFetch = await userFetch.json()
            console.log(jsonFetch)
            setAllUsers(jsonFetch)
        }
        getUsers()
    }, [])
    if(user && user.isAdmin){
    return(
        <div className='userContainer'>{
            allUsers && allUsers.length ? allUsers.map((indivUser, idx) => {
                return(
                    <div className='userDiv' key={idx}>
                        <p> <b>Id:</b> <div>{indivUser.id}</div> </p>
                        <p> <b>Username:</b> <div>{indivUser.username}</div> </p>
                        <p> <b>Email:</b> <div>{indivUser.email}</div> </p>
                        <b>isAdmin?:</b> {indivUser.isAdmin?<p>true</p> : <p>False</p>}
                        <button onClick={() => {
                            makeAdmin(indivUser.id)
                        }}>Make admin</button>
                        <p> <b>Address:</b> <div>{indivUser.address}</div> </p>
                    </div>
                )
            }):<div>No Users</div>
        }</div>
    )}else{
        return(
            <div>
                <h1>Admins only beyong this point</h1>
            </div>
        )
    }
} 

export default AllUsers