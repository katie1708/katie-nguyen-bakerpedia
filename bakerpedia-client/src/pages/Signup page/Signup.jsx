import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";

export default function Signup() {
    const baseURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    //Handle first name
    const [firstname,setFName] = useState("");
    
    const handleFName = (e) => {
        setFName(e.target.value)
    }

    //Handle last name
    const [lastname,setLName] = useState("");
    
    const handleLName = (e) => {
        setLName(e.target.value)
    }
    
    //Handle username
    const [username,setUsername] = useState("");

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    //Handle password
    const [password,setPassword] = useState("");
    const [confirmpassword,setCfPassword] = useState("");

    const handlePW = (e) => {
        setPassword(e.target.value);
    }

    const handleCfPW = (e) => {
        setCfPassword(e.target.value);
    }

    //Create user on submit of the form
    const handleSignup = async(e) => {
        e.preventDefault();

        if(password !== confirmpassword) {
            alert('Passwords are not matched')
        } else {
            const newUser = {
                firstname: firstname,
                lastname:lastname,
                username: username,
                pw: password
            }

            try {
                const res = await axios.post(`${baseURL}/users`,newUser);
                alert("You have registered successfully");
                navigate("/sign-in")
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="signup">
            <h1>Create account</h1>
            <form className="signup__form" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="firstname">First name</label>
                    <input 
                    type="text" 
                    name="firstname"
                    value={firstname}
                    onChange={handleFName}>
                    </input>
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input 
                    type="text" 
                    name="lastname"
                    value={lastname}
                    onChange={handleLName}>
                    </input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={handleUserName}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handlePW}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmpassword">Re-enter Password</label>
                    <input 
                    type="password" 
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={handleCfPW}
                    >
                    </input>
                </div>
                <button>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/sign-in">Log in</Link></p>
        </div>
    )
}