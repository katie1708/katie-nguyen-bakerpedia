import "./Signin.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
import {userAuth} from "../../pages/UserAuth";

export default function Signin() {
    const baseURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const auth = userAuth();

    //Handle first name
    const [username,setUsername] = useState("");
        
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    
    //Handle last name
    const [password,setPassword] = useState("");
        
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //Handle Sign in submit
    const handleSignin = async(e) => {
        e.preventDefault();

        const newSignin = {
            username: username,
            password: password
        }
        
        try {
            const res = await axios.post(`${baseURL}/signin`,newSignin);
            sessionStorage.setItem("authToken", res.data.token);
            alert("You have signed in successfully");
            auth.fetchUser(res.data.token)
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    return(
        <div className="signin">
            <h1>Log in</h1>
            <form className="signin__form" onSubmit={handleSignin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={handleUsername}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handlePassword}></input>
                </div>
                <button>Log in</button>
            </form>
            <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
        </div>
    )
}