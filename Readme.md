# API BOILERPLATE

A minimalistic Web Application with **CRUD** (create, read, update, delete) functionality created with Node.js / MongoDB & Mongoose.js / Express.js, JWT &JSON

## Jwt authentication

**API uthentication** is provided using **Json Web Token & Bcrypt**

## Configuration

The database **settings**, the mongoose **schema**, documents **structure**, fields *names* are stored in **environment variables**


## "As slight as possible"

Since Express >= 4.16.0, body parser has been re-added under the methods express.json() and express.urlencoded(), this web app use only few dependency: [Express](https://expressjs.com), [Mongoose](https://mongoosejs.com), [DotEnv](https://www.npmjs.com/package/dotenv-json), [Bcrypt](https://www.npmjs.com/package/bcrypt), [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)


## Features
- Env settings to bootstrap the project
- Database seeding with sample data
- Express 4 Middleware
- Response Object as JSON
- MVC (Model-View-Controller)
- CRUD (create, read, update, delete)
- Password Hashing
- JWT Authentication


## Quick Up&Running
<br />
<img src="https://media.giphy.com/media/3o7ZetIsjtbkgNE1I4/giphy.gif" height="180px">
<br/>

- Clone the repo

- Edit the `.env` file in the root directory
    - the Project Name
    - the database settings
    - default user authentication
    - middleware options
    - data objects names
    - sample data

- You need a running instance of MongoDB

    `mongod`

- Install the dependencies

    `npm i`

- Run & Fun

    `npm run dev`

## Npm Scripts

- `npm run dev` uses nodemon (you need it global installed)
- `npm start` uses node

## Routes
You can setup the main route and the project routes in the `.env` file

`/` - the default entry point, it will list all the documents in the db
`/login` - to authenticate and create a jwt token (24h valid)
`/protected` - protected route, it requires a valid token in header ('x-auth')

#### Protected root

`/movies/:movieId?` - GET method, it show a single project by id

`/movies/` - POST method, add a new project in db

`/movies/:movieId?` - PUT method, it edits a project by id

`/movies/:movieId?` - DELETE method, it delete a project by id

in this example the `DATA_ROUTE` in `.env` file is `movies` and `movieId` is the `_id` of a document (optional parameter `:movieId?`)



#### Default user
The default user is created automatically during the initialization of the project

`user: admin@admin.de`
`password: admin`

(if you haven't changed the settings in the `.env file`)
