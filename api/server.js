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

//brings the todo schema and json data
app.get('/todos', async(req,res)=>{
    try{
        const todos =  await Todo.find();
        res.json(todos);
    }catch(error){
        console.log(error)
    }
})


//add a new todo to the collection
app.post('/todo/new', async (req,res)=>{
    try{

        const todo = await new Todo({
            text: req.body.text

        });

        todo.save(todo);
        res.send('New todo created at DB')
    }catch(error){
        console.log(error);
    }
});


//delete a todo from the collection
app.delete('/todo/delete/:id', async(req, res)=>{
    try{
        const result = await Todo.findByIdAndDelete(req.params.id)

        res.send(`the todo item with id ${req.params.id} was succesfully deleted`);

    }catch(error){
        console.log(error);
    }
});

//modify the status on the task
app.put('/todo/complete/:id', async(req,res)=>{
    try{

        const todo = await Todo.findById(req.params.id);

        todo.complete = !todo.complete;//change the state

        todo.save();
        //res.json(todo);
        res.send(`the todo item with id ${req.params.id} was succesfully updated to: ${todo.complete}`);

    }catch(error){
        console.log(error);
    }
})


app.listen(3001, ()=>console.log("Server started on port 3001"))
