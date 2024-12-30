import { Link } from "react-router-dom";
import logo from '../../assets/logo/bakerpedia-logo.svg';
import './Footer.scss';

export default function Footer(){
    return(
        <footer className="footer">
            <Link to="/"><img src={logo} alt="logo"/></Link>
        </footer>
    )
};