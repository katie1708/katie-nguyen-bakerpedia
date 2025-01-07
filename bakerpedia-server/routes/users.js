import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const router = express.Router();

//jsonSecretKey
const SECRET_KEY = process.env.SECRET_KEY;

//Authorization
function authorize(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization.slice("Bearer ".length);

    try{
        const payload = jwt.verify(token,SECRET_KEY)
        req.user = payload;
        next();
    } catch(error) {
        res.sendStatus(401)
    }
}

// POST /signup to create user from sign up form
router.post('/users', async (req,res) => {
    const {
        firstname,
        lastname,
        username,
        pw
    } = req.body

    const password = bcrypt.hashSync(pw,10);

    // Validate all fields
    if (!firstname || !lastname || !username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    //Validate if username is already existed
    const foundUser = await knex("users")
    .where('username', username).first();

    if ( foundUser ) {
        return res.status(400).json({ message: `There is an existing user with username of ${username}` });
    }

    //Insert new user
    try{
        const [userId] = await knex('users').insert({
            firstname,
            lastname,
            username,
            password
        });

        const newUser = await knex('users').where('id', userId).first();
        
        res.status(201).json(newUser);

    } catch(e) {
        res.status(500).send("Unable to create user")
    }
})

//Sign in endpoint

router.post('/signin', async (req,res) => {
    const {
        username,
        password
    } = req.body;
    
    const foundUser = await knex("users")
    .where("username", username)
    .first();

    if (foundUser) {
        if(username === foundUser.username && bcrypt.compare(password, foundUser.password)) {
            const token = jwt.sign(
                {id: foundUser.id,
                username: username,
                firstname: foundUser.firstname,
                lastname:foundUser.lastname
                },
                SECRET_KEY
            )
            res.json({token: token});
        };
    } else {
        res.status(404).send("User not found!")
    }
})

//Profile endpoints
router.get('/profile', authorize, (req,res) => {
    res.json(req.user);
})

export default router;