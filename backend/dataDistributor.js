import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models-schemas/userModel.js';
import Product from './models-schemas/productModel.js';
import Order from './models-schemas/orderModel.js';
import mongoDB from "./config/mongodb.js";

dotenv.config();
mongoDB();

async function populateDatabase() {
    try {

        // Clear all documents in Orders, Products and Users collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Import users into Users collection from users.js
        const insertedUsers = await User.insertMany(users);
        const admin = allUsers[0]._id;

        // Import products into Products collection from products.js
        const allProducts = products.map(p => {
            return {...p, user: admin }
        })
        const insertedProducts = await Product.insertMany(allProducts);

        // Log if successful
        console.log('Database populated!'.green.inverse);
        process.exit();

    } catch (err) {
        // Log if error
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
}

async function clearDatabase() {
    try {

        // Clear all documents in Orders, Products and Users collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Log if successful
        console.log('Database cleared!'.yellow.inverse);
        process.exit();

    } catch (err) {
        // Log if error
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
}

const command = process.argv[2]

command === '-p' ? populateDatabase() : clearDatabase();