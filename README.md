# viettel-back-end
## Getting started

This project will run on **NodeJs** using **MongoDB** as database.

## Features

- Basic Authentication (Register/Login with hashed password)
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
- Included CORS.
- **Category** example with **CRUD** operations.
- Validations.

## Software Requirements

- Node.js **8+**
- MongoDB **3.6+** (Recommended **4+**)


### Install npm dependencies after installing (Git or manual download)

```bash
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.


## How to run

### Running API server locally

```bash
npm run start
```

You will know server is running by checking the output of the command `npm run start`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```

**Note:** `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
