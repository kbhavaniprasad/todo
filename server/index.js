require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/UserRoutes');
//const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes=require('./routes/TodoRoute');
const contactRoute = require('./routes/ContactRoute');

const port = 3000;
const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3001',  // Frontend URL
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   };
app.use(cors());
app.use(express.json());
app.use('/register',userRoutes)
app.use('/api', authRoutes);
app.use(todoRoutes);
app.use(contactRoute);

const url = process.env.MONGO_URI; // Use the environment variable
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server Live on ${3000}`);
});

module.exports = app;
