import express from 'express'
import dotenv from 'dotenv'
import mongoDB from './config/mongodb.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMware.js'

dotenv.config();

const app = express()
mongoDB();

app.get('/', (req, res) => {
    res.send('API is running')
});

// ROUTE handling middleware
app.use('/api/products', productRoutes);

// ERROR handling middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
})