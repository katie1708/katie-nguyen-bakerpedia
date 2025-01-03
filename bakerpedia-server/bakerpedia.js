import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import recipesRouter from "./routes/recipes.js"
import typesRouter from "./routes/types.js"
import recordsRouter from "./routes/records.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

//Routes
app.use('/api',recipesRouter)
app.use('/api',typesRouter)
app.use('/api',recordsRouter)

//Port configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});