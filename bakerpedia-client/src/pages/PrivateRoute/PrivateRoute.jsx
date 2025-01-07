import { Link, Navigate } from "react-router-dom";

export function UnauthorizedRoute({children}) {
    const token = sessionStorage.getItem("authToken");

    return token ? children : <Navigate to="/sign-in"/>
}

export function AuthorizedRoute({children}) {
    const token = sessionStorage.getItem("authToken");

    return !token ? children : <Navigate to="/"/>
}