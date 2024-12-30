import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo/bakerpedia-logo.svg';
import './Header.scss';

export default function Header(){
    return(
        <header className="header-wrap">
            <div className="header">
                <Link to="/" className="header__logo"><img src={logo} alt="logo"/></Link>
                <nav className="header__nav">
                    <NavLink to="/" className='header__nav-item'>My Recipes</NavLink>
                    <NavLink to="/add-recipe" className='header__nav-button'>Add Recipes</NavLink>
                </nav>
                <div className="header__user">
                    <p className="header__user--initials">KN</p>
                    <Link to="/profile" className="header__user--fullname">User Fullname</Link>
                </div>
            </div>
        </header>
    )
};