const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors=require('cors');


// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
    origin: 'https://ghost-shooter-game.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specified methods
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/scores', require('./routes/scores'));
app.get("/" , (req , res)=>{
    res.json({
        message : "Working Successss"
    })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
