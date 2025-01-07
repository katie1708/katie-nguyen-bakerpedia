import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo/bakerpedia-logo.svg';
import './Header.scss';
import { useEffect, useState,useContext } from "react";
import {userAuth} from "../../pages/UserAuth";
import { MdLogout } from "react-icons/md";

export default function Header({excludeRoutes}){
    const auth = userAuth();
    const user = auth.user;

    const [path,setPath] = useState("/sign-in")

    useEffect(() => {
        setPath(location.pathname)
    },[location.pathname])
    
    if(excludeRoutes.includes(path)) {
        return(
            <header className="header-wrap">
                <div className="header">
                <Link to="/" className="header__logo"><img src={logo} alt="logo"/></Link>
                </div>
            </header>
        )
    } else {
        return(
            <header className="header-wrap">
                <div className="header">
                    <Link to="/" className="header__logo"><img src={logo} alt="logo"/></Link>
                    <nav className="header__nav">
                        <NavLink to="/" className='header__nav-item'>My Recipes</NavLink>
                        <NavLink to="/add-recipe" className='header__nav-button'>Add Recipes</NavLink>
                    </nav>
                    { user ? 
                    <div className="header__user">
                        <p className="header__user--initials">{(user.firstname && user.lastname) ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}` : ''}</p>
                        <Link to="/profile" className="header__user--fullname">{`${user.firstname} ${user.lastname}`}</Link> 
                        <MdLogout size={24} onClick={() => auth.signOut()}/>
                    </div> : ""
                    }
                </div>
            </header>
        )
    }
};