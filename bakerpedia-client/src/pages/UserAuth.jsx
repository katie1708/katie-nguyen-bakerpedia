import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();

const AuthProvider = ({children}) => {
    const navigate=useNavigate();
    const [user,setUser] = useState(null);
    const baseURL = import.meta.env.VITE_API_URL;

    const fetchUser = async(token) => {
        try{
            const res = await axios.get(`${baseURL}/profile`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            if(res.data) {
                setUser(res.data)
            }
  
          } catch(error) {
            console.log(error);
          }
    }

    useEffect(() => {
        if(sessionStorage.getItem("authToken")){
            fetchUser(sessionStorage.getItem("authToken"))
        }
    },[])

    const signOut = () => {
        setUser(null);
        sessionStorage.removeItem("authToken");
        navigate("/sign-in");
      };

    return <AuthContext.Provider value={{user,fetchUser,signOut}}>{children}</AuthContext.Provider>
};

export default AuthProvider;

export const userAuth = () => {
    return useContext(AuthContext);
}