# JWT-Auth-NodeJS

## Overview

This is a Node.js application that manages user authentication using JWT (JSON Web Tokens). The app is built with Express.js and connects to a MongoDB database running in Docker.

## Features

- User registration with password hashing using `bcrypt`
- User login with JWT generation
- Protected routes using JWT authentication
- MongoDB database for user data storage
- Dockerized MongoDB for ease of deployment


## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (Dockerized)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **API Testing**: Postman


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pydevazmi/JWT-Auth-NodeJS
   ```

2. Navigate to the project directory:
   ```bash
   cd JWT-Auth-NodeJS
   ```

3. Setup the environment variables:
    ```bash
    touch .env
    ```
  Write the following in the .env file:
    MONGODB_USER=your-username
    MONGODB_PASSWORD=your-password
    MONGODB_DATABASE=your-database
    MONGODB_DOCKER_PORT=27017
    NODE_PORT=5000
    JWT_SECRET=your-jwt-secret

3. build the Docker image:
   ```bash
   docker-compose build
   ```

4. run the Docker containers:
   ```bash
   docker-compose up
   ```

5. install the bcrypt because it depends on the OS:
   ```bash
   docker exec -it dockeronnode-node-app-1 /bin/bash
   #/ npm install bcrypt
   ```


## API Documentation
   this is the API documentation for the JWT-Auth-NodeJS application published on Postman:
   https://documenter.getpostman.com/view/23311056/2sAYBPmZku


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for enhancements or bug fixes.


## License
This project is licensed under the MIT License.