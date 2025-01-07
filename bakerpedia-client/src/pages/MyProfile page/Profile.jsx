import { useState,useEffect } from "react";
import "./Profile.scss"
import { useContext } from "react";
import {userAuth} from "../UserAuth.jsx";

export default function Profile() {
    const auth = userAuth();
    const user = auth.user;

    if(user) {
        return(
            <div className="profile">
                <h1>My Profile</h1>
                <form className="profile__form">
                    <div>
                        <label htmlFor="first-name">First name</label>
                        <input type="text" name="first-name" placeholder={user.firstname}></input>
                    </div>
                    <div>
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" name="last-name" placeholder={user.lastname}></input>
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder={user.username}></input>
                    </div>
                    {/* <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password}></input>
                    </div> */}
                    {/* <button>Update</button> */}
                </form>
            </div>
        )
    }
    
}