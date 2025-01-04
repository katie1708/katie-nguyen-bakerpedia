import "./Signup.scss";
import { Link } from "react-router-dom"


export default function Signup() {

    return(
        <div className="signup">
            <h1>Create account</h1>
            <form className="signup__form">
                <div>
                    <label htmlFor="first-name">First name</label>
                    <input type="text" name="first-name"></input>
                </div>
                <div>
                    <label htmlFor="last-name">Last name</label>
                    <input type="text" name="last-name"></input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"></input>
                </div>
                <div>
                    <label htmlFor="password">Re-enter Password</label>
                    <input type="password" name="password"></input>
                </div>
                <button>Sign Up</button>
            </form>
            <p>Already have an account? <Link>Log in</Link></p>
        </div>
    )
}