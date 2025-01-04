import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup page/Signup";
import Signin from "./pages/Signin page/Signin.jsx";
import Profile from "./pages/MyProfile page/Profile.jsx";
import Recipes from "./pages/MyRecipes page/Recipes.jsx";
import RecipeDetails from "./pages/RecipeDetails page/RecipeDetails.jsx";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/sign-up" element={<Signup/>}></Route>
            <Route path="/sign-in" element={<Signin/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/" element={<Recipes/>}></Route>
            <Route path="/recipes/:recipeId" element={<RecipeDetails/>}></Route> 
            <Route path="/add-recipe" element={<AddRecipe/>}></Route> 
            <Route path="/edit-recipe" element={<EditRecipe/>}></Route>
          </Routes>
          <Footer />
    </BrowserRouter>
  )
}

export default App
