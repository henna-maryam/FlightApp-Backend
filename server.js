const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('connection error:',err));


const userRouter = require('./routes/route');
app.use('/signin',userRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
})