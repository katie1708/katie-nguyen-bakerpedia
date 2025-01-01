import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import recipesRouter from "./routes/recipes.js"
import recipeTypes from "./routes/types.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

//Routes
app.use('/api',recipesRouter)
app.use('/api',recipeTypes)

//Port configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});