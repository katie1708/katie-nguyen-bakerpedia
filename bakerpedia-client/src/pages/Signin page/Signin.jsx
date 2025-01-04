import "./Signin.scss"
import { Link } from "react-router-dom"

export default function Signin() {

    return(
        <div className="signin">
            <h1>Log in</h1>
            <form className="signin__form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"></input>
                </div>
                <button>Log in</button>
            </form>
            <p>Don't have an account? <Link>Sign Up</Link></p>
        </div>
    )
}