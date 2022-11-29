import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const [email, setEmail] = useState("")
        const [address, setAddress] = useState("")

        const navigate = useNavigate()
        
        async function registerAPI (event) {
            event.preventDefault()

            try{
                const data = await fetch('https://gg-3pln.onrender.com/api/users/register', 
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : "application/json"
                    }, body: JSON.stringify({
                        username,
                        password,
                        email,
                        address
                      })
                    
                })
                const results = await data.json()
                    console.log(results)
                if (results) {
                    localStorage.setItem("token", results.token)   
                } else {
                    alert (results.message)
                }
                if (results){
                     navigate("../")
                }
                
            } catch(error){
                console.log(error)
            }
            
           }

        function changePass (event) {
         setPassword(event.target.value)
        }
        function changeUser (event) {
         setUsername(event.target.value)
        }
        function changeEmail (event) {
            setEmail(event.target.value)
        } 
        function changeAddress (event) {
            setAddress(event.target.value)
        }
         return (
            <div className = "container">
            <form onSubmit={registerAPI}>
                <div className = "TypingInput">
                    <div>Enter Username: </div>
                    <input type = "text" value = {username} onChange={changeUser}></input>
                </div>
                <div className = "TypingInput">
                    <div>Enter Password: </div>
                    <input type = "password" value = {password} onChange={changePass}></input>
                </div>
                <div className = "TypingInput">
                    <div>Enter Email: </div>
                    <input type = "email" value = {email} onChange={changeEmail}></input>
                </div>
                <div className = "TypingInput">
                    <div>Enter Address: </div>
                    <input type = "text" value = {address} onChange={changeAddress}></input>
                </div>
                <div className = "submitcontain">
                   <button type = "submit">Register</button>
                </div>
            </form>
          </div>
     
         ) 
}

export default Register