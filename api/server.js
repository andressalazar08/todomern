require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const { URI } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
})
    .then(()=>console.log("Conectado a DB cloud"))
    .catch(console.error);

app.get('/todos', async(req,res)=>{
    const todos =  await Todo.find();

    res.json(todos);
})

app.listen(3001, ()=>console.log("Server started on port 3001"))
