# Project Title
Bakerpedia

## Overview

Bakerpedia will act like a assitant during your baking journey where you can store all of your recipes and every baking records.

### Problem

As a beginner in baking journey, myself have a hard time looking around internet afor recipes and writing it down in my note book as well as writing down my achievement or failures after each baking time. My notebook is almost full and it takes me some time to find an existing recipes. That's why I came up with this idea to help my baking journey a little bit easier.

### User Profile

Bakers but can extend to anyone who wants to manage their cooking recipes easier.

### Features

- As a user, I want to be able to create an account to manage my recipes
- As a user, I want to be able to login to my account to manage my recipes

- As a user, I want to manage all of my recipes
- As a user, I want to add a baking/cooking recipe
- As a user, I want to see all details of a recipe
- As a user, I want a quick way to search for a specifc recipe in my recipes list
- As a user, I want to be able to filter recipes by its type and difficulty level
- As a user, I want to edit a recipe

- As a user, I want to add a baking record of a specific recipe
- As a user, I want to see all my baking records of a specific recipe
- As a user, I want to delete a baking records

## Implementation

### Tech Stack

- React
- MySQL
- Express

### APIs

These APIs can be used for nice to have features
- OpenAI GPT API
- Youtube Data API

### Sitemap

- Sign up page
- Sign in page
- Profile page
- Home page/My recipes page
- Add recipe page
- Recipe details page
- Edit recipe page
- Add baking record modal

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

### Endpoints

**POST /signup**

- Add a user account

Request:
```
{
    "username": "katie1234",
    "firstname": "Katie",
    "lastname": Nguyen,
    "password": "**********"
}
```

Response:
```
{
  "success": "true";
}
```

**POST /signin**

- Login a user

Parameters:
- username: username of the user
- password: password of the user


Response:
```
{
    "token": "************************************************************"
}
```
**GET /profile**

- Retrieve user's profile

Request headers:
```
{
  headers: {
    Authorization: `Bearer ${TOKEN_HERE}`;
  }
}
```

Response:
```
{
    iat: 1234, 
    "username": "katie1234",
    "firstname": "Katie",
    "lastname": Nguyen,
    "password": "**********"
}
```

**GET /types**

- Get all types

Response:
```
[
    {
        "id": 1,
        "name": "Cookies",
        "icon": "cookies.svg"
    },
    {
        "id": 2,
        "name": "Bread",
        "icon": "bread.svg"
    },
    ...
]
```

**GET /recipes**

- Get a list of all recipe

Response:
```
[
    {
        "id": 1,
        "name": "Double Chocolate Cookies",
        "type_id": 1,
        "user_id": 1,
        "time": 120,
        "difficulty level": "easy",
        "image": "cookies.png",
        "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
        "instructions": [
            {
                step: 1,
                text: "Mix all dry ingredients"
            },
            {
                step: 1,
                text: "Combine dry ingredents with melted butter"
            },
            ...
        ]
    },
    ...
]
```

**GET /recipes/:id**

- Get details of a single recipe

Parameters:
- id: Recipe id as number

Response:
```
{
    "id": 1,
    "name": "Double Chocolate Cookies",
    "type_id": 1,
    "user_id": 1,
    "time": 120,
    "difficulty level": "easy",
    "image": "cookies.png",
    "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
    "instructions": [
        {
            step: 1,
            text: "Mix all dry ingredients"
        },
        {
            step: 2,
            text: "Combine dry ingredents with melted butter"
        },
        ...
    ]
}
```

**POST /recipes**

- Add a recipe

Request:
```
{
    "name": "Double Chocolate Cookies",
    "type_id": 1,
    "user_id": 1,
    "time": 120,
    "difficulty level": "easy",
    "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
    "instructions": [
        {
            step: 1,
            text: "Mix all dry ingredients"
        },
        {
            step: 2,
            text: "Combine dry ingredents with melted butter"
        },
        ...
    ]
}
```
Response:
```
{
    "id": 1,
    "name": "Double Chocolate Cookies",
    "type_id": 1,
    "user_id": 1,
    "time": 120,
    "difficulty level": "easy",
    "image": "cookies.png",
    "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
    "instructions": [
        {
            step: 1,
            text: "Mix all dry ingredients"
        },
        {
            step: 2,
            text: "Combine dry ingredents with melted butter"
        },
        ...
    ]
}
```

**PUT /recipes/:id**

- Edit an existing recipe

Request:
```
{
    "id": 1
    "name": "Double Chocolate Cookies",
    "type_id": 1,
    "user_id": 1,
    "time": 120,
    "difficulty level": "easy",
    "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
    "instructions": [
        {
            step: 1,
            text: "Mix all dry ingredients"
        },
        {
            step: 2,
            text: "Combine dry ingredents with melted butter"
        },
        ...
    ]
}
```
Response:
```
{
    "id": 1,
    "name": "Double Chocolate Cookies",
    "type_id": 1,
    "user_id": 1,
    "time": 120,
    "difficulty level": "easy",
    "image": "cookies.png",
    "ingredients": ["all purpose flour", "butter", "choco chips", "brown sugar"],
    "instructions": [
        {
            step: 1,
            text: "Mix all dry ingredients"
        },
        {
            step: 2,
            text: "Combine dry ingredents with melted butter"
        },
        ...
    ]
}
```
**GET /recipes/:id/records**

- Get a list of all baking records of a single recipe

Parameters:
-id: Recipe Id as a number

Response:
```
[
    {
        "id": 1,
        "date": 1734481935,
        "rating": 4,
        "notes": "This time is a massive success",
        "recipe_id": 1
    },
    ...
]

```
**POST /records**

- Add a baking record

Request:
```
{
    "date": 1734481935,
    "rating": 4,
    "notes": "This time is a massive success",
    "recipe_id": 1
}
```

Response:
```
{
    "id": 1
    "date": 1734481935,
    "rating": 4,
    "notes": "This time is a massive success",
    "recipe_id": 1
}
```

**DELETE /records/:id**

- Delete a baking records

Parameters:
- id: Record Id as a number

Response:
- 404 if record id is not found
- 204 if successfully deleted

### Auth

- A user will need to be registered first
- Without signing up or signing in, the user will be able to see Signup/Signin page only
- Once authorized, they will be able to see other pages

## Roadmap

- Create client repo with React

- Create server repo with Express

- Gather sample recipe data and do Knex migrations and seeds

- Feature: Sign up
    - Frontend: Create Sign up component
    - Backend: Create POST /signup endpoint

- Feature: Sign in
    - Frontend: Create Sign in component
    - Backend: Create POST /signup endpoint

- Feature: My Profile page
    - Frontend: Create My Profile component
    - Backend: Create GET /profile endpoint

- Feature: My recipes
    - Frontend: Create My recipes component
    - Backend: Create GET /recipes, GET /types endpoints

- Feature: Recipe details
    - Frontend: Create Recipe details component
    - Backend: Create GET /recipes/:id, GET /recipes/:id/records and DELETE /records/:id endpoints

- Feature: Add Baking History modal
    - Frontend: Create Add Baking History modal
    - Backend: Create POST /records endpoint

- Feature: Add recipe
    - Frontend: Create Add recipe component
    - Backend: Create POST /recipes endpoint

- Feature: Edit recipe
    - Frontend: Create Edit recipe component
    - Backend: Create PUT /recipes/:id endpoint

- Site wide testing

- Bug fixes

- Submit project

- DEMO DAY

## Nice-to-haves

- As a user, I want to be able to ask chatgpt for any question I have right on the app
- As a user, I want to add recommendations for a existing recipe with videos scraped from Youtube
