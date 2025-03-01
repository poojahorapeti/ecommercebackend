const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDB= require("./src/config/db"); //DBconnection
const productRoutes = require("./src/routes/productRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const userRoutes = require('./src/routes/users');
const authRoutes = require("./src/routes/productRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use('/users', userRoutes);
//npm startapp.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("api/wishlist", require("./src/routes/wishlistRoutes"));
app.get('/', (req,res) => {
   res.send("Server is Running"); 
});
const PORT = process.env.PORT ;
connectDB().then(() => {
    app.listen(PORT, () => {
         console.log('Server is running on port' + PORT);
});
});


