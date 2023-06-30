# My Menu
## Overview
With the food left in fridge, what should I cook to fit my appetite?
My Menu is for you to recall all your loved recipes with food in your fridge! (or vice versa, how to cook my favorate dish)

## Usage on Local
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

`/` -- page for menu dictionary
![dictionary page](./documentation/dictionary-page.png)

`/edit` -- page to add, edit, or delete recipe
![recipe edit page](./documentation/edit-page.png)

`/:recipe_name` -- page to show each recipe
![recipe show page](./documentation/edit-page.png)

`/login` -- page to authenticate an existing user
![login page](./documentation/login-page.png)

`/register` -- page to register a new user
![register page](./documentation/register-page.png)

## Site Map
```
|-  /              
|                  
|-  /edit          
|                  
|-  /:recipe_name
|                  
|-  /login         
|                  
|-  /register      
```

## User Stories
- As a non-registered user, I can register a new account with the site.
- As a user, I can log into my account.
- As a user, I can log out of my account.
- As a user, I can delete my account.

- As a user, I can create a new recipe.
- As a user, I can edit my recipe.
- As a user, I can delete my recipe.

- As a user, I can view all my recipes.
- As a user, I can search a recipe via dish name.
- As a user, I can search recipes that include the same ingredients.

## Research Topics
1. React Router
    - an api that creates single page application in React applications
2. CORS
    - optional HTTP headers set by server to tell the client to read resources from another protocol/ host/ port
3. Fetch
    - an AJAX api that creates single page application
4. mongo-sanitize
    - a module that sanitizes user input to defend against query selector injection attacks
5. bcryptjs
    - a module that salts and hashes raw password to protect user accounts
6. Passport.js
    - an authentication middleware which provides various strategies
7. JWT
    - a method to encode data to transfer between parties
8. axios
    - a promised baesd library to send HTTP requests

## Reference
1. [React](https://react.dev/reference/react)
    - [React folder structure](https://legacy.reactjs.org/docs/faq-structure.html)
    - [Context](https://react.dev/learn/passing-data-deeply-with-context) [-- link to code](./client/src/context/authProvider.jsx)
    - [custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) [-- link to code](./client/src/hooks/) 
2. [React Router](https://reactrouter.com/en/main/start/overview) [-- link to code](./client/src/appRoutes.jsx)
    - [tutorial](https://www.youtube.com/watch?v=Ul3y1LXxzdU&t=634s)
    - [Location](https://v5.reactrouter.com/web/api/location) [-- link to code](./client/src/components/protectedRoutes.jsx)
    - [Navigate](https://reactrouter.com/en/main/components/navigate) [-- link to code](./client/src/components/protectedRoutes.jsx)
    - [Outlet](https://reactrouter.com/en/main/components/outlet) [-- link to code](./client/src/components/protectedRoutes.jsx)
3. [socket.IO (decided not to implement)](https://socket.io/docs)
    - [React showcase](https://socket.io/how-to/use-with-react)
    - [cors](https://socket.io/docs/v4/handling-cors/)
4. [axios](https://github.com/axios/axios) [-- link to code](./client/src/api/axios.jsx)
    - [axios interceptor](https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors) [-- link to code](./client/src/hooks/useAxiosTooken.jsx)
    - [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)
5. [mongo-sanitize](https://www.npmjs.com/package/mongo-sanitize) [-- link to code](./server/src/middlewares/sanitizeInput.mjs)
6. [bcryptjs](https://www.npmjs.com/package/bcryptjs) [-- link to code](./server/src/routes/authJWT.mjs)
7. [passport-local (decided not to implement)](https://www.passportjs.org/concepts/authentication) [-- link to code](./server/src/routes/authLocal.mjs)
    - [passport manual](https://github.com/jwalton/passport-api-docs#intro)
    - [serialize & deserialize work flow](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)
    - [passport-local & AJAX](https://itecnote.com/tecnote/jquery-ajax-call-to-passportjs-login-on-express-nodejs-framework/)
    - [cors & setting cookies (credentials)](https://github.com/jaredhanson/passport/issues/446)
    - [deserializeUser is not called (manual login)](https://stackoverflow.com/questions/57293115/passport-deserializeuser-not-being-called) [-- link to code](./server/src/utils/localPassport.mjs)
8. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) [-- link to code](./server/src/routes/authJWT.mjs)
    - [httpOnly cookie and react](https://stackoverflow.com/questions/68970499/how-to-get-http-only-cookie-in-react)
    - [tutorial on server](https://www.youtube.com/watch?v=f2EqECiTBL8)
    - [tutorial on client](https://www.youtube.com/watch?v=nI8PYZNFtac)
    - [JWT handbook](https://auth0.com/resources/ebooks/jwt-handbook)
    - [token intro](https://auth0.com/docs/secure/tokens)
    - [cookie headers](https://expressjs.com/en/api.html#res.cookie)
9. [dotenv](https://www.npmjs.com/package/dotenv) [-- link to code](./server/src/routes/authJWT.mjs)
## [Project Journal](./documentation/journal.md)
This journal is dedicated to record my learning progress when doing this project.