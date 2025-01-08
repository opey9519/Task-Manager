// Requiring Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const method_overide = require('method-override') // Allows usage of PUT & DELETE HTTP requests in non-native clients;

const app = express(); // Creating instance of express
const port = 3000; // Port variable 
app.use(express.static(path.join(__dirname, 'public')))  // serves CSS & JS files
app.set('views', path.join(__dirname, 'views')) // defaults path to views
app.set('view engine', 'ejs') // gives Express access to viewing ejs
app.use(express.json()); // Parses incoming JSON data to request.body
app.use(express.urlencoded({ extended: true }))
app.use(method_overide('_method'))


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

// Check if tasks present in database
async function check_data() {
    try {
        const data = await Task.find();
        if (data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log("Error Checking data:", error);
    }
}

// Routing
// Index
app.get('/tasks', async (req, res) => {
    try {
        const data = await check_data();
        res.render('index', { data: data })
    }
    catch (error) {
        res.render("Error Loading Page")
    }
})

// Create new task
app.post('/tasks', async (req, res) => {
    try {
        const { task, date } = req.body;
        const new_task = new Task({
            name: task,
            date: date,
            complete: false
        })
        await new_task.save();
        res.redirect('/tasks')
    }
    catch (error) {
        console.log("Error Adding Task:", error);
        res.redirect('/tasks');
    }
})

// Update task data
app.patch('/tasks/:id/edit', async (req, res) => {
    try {
        const {id} = req.params;
        const { task, date } = req.body;

        const updated_task = await Task.findByIdAndUpdate(
            id,
            {name: task, date: date},
            {new: true, runValidators: true}
        );

        res.status(200).json(updated_task); // send updated json to frontend
    }
    catch (error) {
        console.log("Error Updating Task:", error);
        res.redirect('/tasks');
    }
})

// Delete task from database
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id);
        res.redirect('/tasks');
    }
    catch (error) {
        console.log("Error Deleting Task:", error);
        res.redirect('/tasks');
    }
})


// Listening verification
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})