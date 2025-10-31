## Title and Description

A **full stach(MERN)** application that allows users to communicate with each other in real-time implemented with **Socket.io** along with authentication and authorization feature implemented with **JWT**. The system saves all of the chat in the MongoDB , hence allowing the users to retrive chat history also.
## Features

    1. User Authentication & Authorization
        - JWT-based login/signup
        - Password hashing with bcrypt
        - Role-based access (user, admin)
        - Middleware for authentication and authorization

    2. Real-time chats
        -Socket.io real-time updates
        -Room based messaging and real-time updates
        -Socket events emitting and listening
        -Retreival of chat history from the database





## Tech Stack


- MongoDB + Mongoose
- Express
- React.js + Vite
- Node.js


## Project Set Up and running

1. Clone the repository using:
            
        git clone https://github.com/Sahil-Bista/Simple-Chat-App.git
2. Move to the repo using 

        cd Simple-Chat-App
3. Open two command lines
4. Go to the server folder from one command line using the CD command and to the client folder from another command line.
3. Install dependencies for both using:

        npm install
4. Create a .env in the server directory using the following      configuration : 

        PORT=5000
        MONGO_URI=your_mongo_atlas_connection_string
        ACCESS_TOKEN_SECRET=your_access_token_secret
        REFRESH_TOKEN_SECRET=your_refresh_token_secret

5.Run the server using:
    
    server : npm start
    client : npm run dev