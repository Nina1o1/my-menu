# My Menu
## Overview
With the food left in fridge, what should I cook to fit my appetite?
My Menu is for you to recall all your loved recipes with food in your fridge! (or vice versa, how to cook my favorate dish)

## Usage
- set up and run client
  ```sh
  $> cd client
  $> npm install
  $> npm run dev
  ```

- set up and run server
  ```sh
  $> cd server
  $> npm install
  $> npm run dev
  ```

## Data Model
The application will store Users and Recipes
- users can have multiple recipes (via reference)

A Sample User: 
```json
{
  "username": "Nina", // unique username
  "hash": ,// a hashed password
  "menus": ,// an array of references to List documents
}
```
A Sample Recipe 
```json
{
  "name": "hand-torn chicken",
  "ingredients": ["chicken", "delicious sause"],
  "description": "boil the chicken, then dip it in to sause",
  "image": // TODO: store image in mongoose
}
```
[Link to Sample Database](./documentation/sampledb.mjs)

## Wireframes

/ - page for menu dictionary
![dictionary page](./documentation/dictionary-page.png)

/edit - page to add, edit, or delete recipe
![recipe edit page](./documentation/edit-page.png)

/recipe_name - page to show each recipe
![recipe show page](./documentation/edit-page.png)

## Site Map
```
-------------------------
|         |             |
/       /edit     /recipe_name
```

## User Stories
1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new recipe
4. as a user, I can view all my recipes
5. as a user, I can edit my recipe
6. as a user, I can delete my recipe

## Research Topics
frontend
- React Router
  - react router library enables single page application

backend
- authentication

## Reference
1. [react folder structure](https://legacy.reactjs.org/docs/faq-structure.html) [(link to code)](./client/src/)
2. [react routing](https://reactrouter.com/en/main/start/overview) [(link to code)](./client/src/appRoutes.jsx)
    - [tutorial](https://www.youtube.com/watch?v=Ul3y1LXxzdU&t=634s)
3. [passport local strategy](https://www.passportjs.org/concepts/authentication) [(link to code)](./server/src/routes/auth.mjs)
    - [passport & AJAX](https://itecnote.com/tecnote/jquery-ajax-call-to-passportjs-login-on-express-nodejs-framework/)
    - [tutorial (doc arrangement)](https://www.youtube.com/watch?v=74ZsbGHsPCo)
    - [serialize & deserialize work flow](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)
    - [cors & setting cookies (credentials)](https://github.com/jaredhanson/passport/issues/446)
    - [deserializeUser is not called (manual login)](https://stackoverflow.com/questions/57293115/passport-deserializeuser-not-being-called)
4. 