# Karakum - E-Commerce Web App

[Karakum App](https://karakum.herokuapp.com)

## Features
-  Admin Panel
-  Authentication
-  Cart
-  Pagination
-  Payment
-  Profile Page
-  Reviews
-  Search

## Stack

- [MongoDB](https://www.mongodb.com) -  NoSQL database
- [Express](https://expressjs.com) - Back end web application framework for Node.js
- [React.js](https://reactjs.org) - A JavaScript library for building user interfaces.
- [Node](https://nodejs.org/en/) - JavaScript runtime environment that executes JavaScript code outside a web browser. 


## Project structure

```
$PROJECT_ROOT
+-- backend                             
|   +-- config                          // MongoDB Configuration
|   +-- controllers                     // Express Controllers
|   +-- data                            // Dummy Data
|   +-- middleware                      // Auth & Erro handling Middlewares
|   +-- models                          // Mongoose Models
|   +-- routes                          // Express Routes
|   +-- utils                           // Token Generator
+-- frontend
|   +-- public                          // Static Files
|   +-- src                             // App Root Folder
|   |   +-- actions                     // Redux Actions
|   |   +-- components                  // React Components
|   |   +-- constants                   // Redux Constants
|   |   +-- reducers                    // Redux Reducers
|   |   +-- screens                     // Page Files
|   |   +-- App.js                      // App Compnent
|   |   +-- index.js                    // App Entry Point
|   |   +-- store.js                    // Redux Store File
+-- uploads                             // Uploaded Files

```

## Packages/Modules utilized

+ **Backend** 						    	

        - bcryptjs					: enables storing of passwords as hashed passwords
        - colors       				: get colors in your node.js console
        - dotenv                			: loads environment variables from .env file	
        - jsonwebtoken      				: allows you to decode, verify and generate JWT	
        - morgan     					: HTTP request logger middleware for node.js	     	
        - multer					: middleware for handling multipart/form-data i.e images
			
+ **Frontend** 	
						                  
        - axios					: promise based HTTP client for the browser and Node.js
        - react-helmet 				: secure your Express apps by setting various HTTP headers
        - react-bootstrap				: Bootstrap components built with React
        - react-router-bootstrap			: integration between React-Router and React-Bootstrap
        - redux					: manages and centralizes application state
        - react-redux   				: React UI bindings layer for Redux	
        - react-paypal-button-v2  			: React button component to implement PayPal's Checkout
        

## Steps to Install & Run 
 
 1. Clone the code from this repo
 2. Open terminal on frontend and backend folders and type `npm install #or yarn install`
 3. Run the development server `npm start #or yarn dev`
    
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

## Homepage
![Homepage](./img/Home.png)
