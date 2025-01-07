import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup page/Signup";
import Signin from "./pages/Signin page/Signin.jsx";
import Profile from "./pages/MyProfile page/Profile.jsx";
import Recipes from "./pages/MyRecipes page/Recipes.jsx";
import RecipeDetails from "./pages/RecipeDetails page/RecipeDetails.jsx";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import {AuthorizedRoute, UnauthorizedRoute} from "./pages/PrivateRoute/PrivateRoute.jsx";
import AuthProvider from "./pages/UserAuth.jsx";

function App() {
  const [user,setUser] = useState("")

  const baseURL = import.meta.env.VITE_API_URL;

  const excludeRoutes = ['/sign-up','/sign-in']

  const token = sessionStorage.getItem("authToken");

  // const [profile, setProfile] = useState("")

  useEffect(() => {

    const fetchProfile = async() => {
      if (!token) {
        return;
      } else {
        try{
          const res = await axios.get(`${baseURL}/profile`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(res.data)

        } catch(e) {
          console.log(e);
        }
      }
    }

    fetchProfile()
  }, [token]);

  return (
    <BrowserRouter>
          <AuthProvider>
          <Header excludeRoutes = {excludeRoutes}/>
          <Routes>
            <Route path="/sign-up" element={
              <AuthorizedRoute>
                <Signup/>
              </AuthorizedRoute>
              }></Route>
            <Route path="/sign-in" element={
              <AuthorizedRoute>
                <Signin/>
              </AuthorizedRoute>
              }></Route>
            <Route path="/profile" element={
              <UnauthorizedRoute>
                <Profile />
              </UnauthorizedRoute>
              }></Route>
            <Route path="/" element={
              <UnauthorizedRoute>
                <Recipes />
              </UnauthorizedRoute>
              }></Route>
            <Route path="/recipes/:recipeId" element={
              <UnauthorizedRoute>
                <RecipeDetails/>
              </UnauthorizedRoute>
              }></Route> 
            <Route path="/add-recipe" element={
              <UnauthorizedRoute>
                <AddRecipe/>
              </UnauthorizedRoute>
              }></Route> 
            <Route path="/edit-recipe" element={
              <UnauthorizedRoute>
                <EditRecipe/>
              </UnauthorizedRoute>
              }></Route>
          </Routes>
          {!excludeRoutes.includes(location.pathname) && <Footer />}
          </AuthProvider>
    </BrowserRouter>
  )
}

export default App
