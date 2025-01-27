import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddRecipe from "./pages/AddRecipe page/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe page/EditRecipe.jsx";
import Profile from "./pages/MyProfile page/Profile.jsx";
import Recipes from "./pages/MyRecipes page/Recipes.jsx";
import { AuthorizedRoute, UnauthorizedRoute } from "./pages/PrivateRoute/PrivateRoute.jsx";
import RecipeDetails from "./pages/RecipeDetails page/RecipeDetails.jsx";
import Signin from "./pages/Signin page/Signin.jsx";
import Signup from "./pages/Signup page/Signup";
import AuthProvider from "./pages/UserAuth.jsx";

function App() {
  const [user,setUser] = useState("")

  const baseURL = import.meta.env.VITE_API_URL;

  const excludeRoutes = ['/sign-up','/sign-in']

  const token = sessionStorage.getItem("authToken");

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
            <Route path="/edit-recipe/:recipeId" element={
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
