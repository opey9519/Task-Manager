// Requiring Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); // Creating instance of express
const port = 3000; // Port variable 
app.use(express.static(path.join(__dirname, 'public')))  // serves CSS & JS files
app.set('views', path.join(__dirname, 'views')) // defaults path to views
app.set('view engine', 'ejs') // gives Express access to viewing ejs
app.use(express.json()); // Parses incoming JSON data to request.body
app.use(express.urlencoded({ extended: true })) // 

// Connecting mongoose database
mongoose.connect('mongodb://127.0.0.1:27017/tasks')
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.log("Error connecting to MongoDB")
    console.log(error)
})

// Mongoose schema
const task_schema = new mongoose.Schema({
    name: String,
    date: String,
    completed: Boolean,
})

// Creates a collection in Mongo and creates an instance of class 'Task'
const Task = mongoose.model('Task', task_schema);


// Routing
// Index
app.get('/tasks', (req, res) => {
    res.render('index')
})

// Create new task
app.post('/tasks/new', (req, res) => {

})

// Update task data
app.patch('/tasks/:id/edit', (req, res) => {

})

// Delete task data
app.delete('/tasks/:id', (req, res) => {

})


// Listening verification
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})