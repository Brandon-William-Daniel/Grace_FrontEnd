import {useState} from "react"
import {Link, useNavigate, useOutletContext} from "react-router-dom"

const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { getUser } = useOutletContext();

   async function loginAPI (event) {
    event.preventDefault()
    try{
        
        const data = await fetch('https://gg-3pln.onrender.com/api/users/login', 
        {
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },body: JSON.stringify({
                username,
                password
              })
            
        })
        const results = await data.json()
        // console.log(results)
        if (results.token) {
            localStorage.setItem("token", results.token)
            getUser()
            navigate("../")
            
            alert(results.message)
        } else {
            alert (results.message)
        }
        // if (results.token){
           
        // }
    } catch(error){
        console.log(error)
    }
    
   }
   
   function changePass (event) {
    // console.log(password)
    setPassword(event.target.value)
    
    }
   function changeUser (event) {
    // console.log(username)
    setUsername(event.target.value)
    
    }
    return (
        <div className = "container">
        <form onSubmit={loginAPI}>
            <div className = "TypingInput">
                <div>Username: </div>
                <input type = "text" value = {username} onChange={changeUser}></input>
            </div>
            <div className = "TypingInput">
                <div>Password: </div>
                <input type = "password" value = {password} onChange={changePass}></input>
            </div>
            <div className = "submitcontain">
               <button type = "submit">Login</button>
            </div>
        </form>
        <div className="register"> <Link to = "/Register" className = "NavButton">Click here to Register</Link></div>
      </div>
    )
}

export default Login