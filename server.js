const express = require('express');
const app = express();
const path = require('path')
const port = 3000;


app.use(express.json()); // Parses incoming JSON data to request.body

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views')) // defaults path to views
app.set('view engine', 'ejs') // tells Express to find view files when rendering

// Temporary database
const tasks = [];

// Renders Task Manager
app.get('/', (req, res) => {
    res.render('index', { tasks });
})

// Create New Task
app.post('/tasks', (req, res) => {
    const { task } = req.body
    if (task) {
        tasks.push(task)
    }
    res.redirect('/')
})

// Delete task based on id number
app.delete('/tasks:id', (req, res) => {
    const id_num = parseInt(req.params.id);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id_num) {
            tasks.splice(id_num, 1);
            res.status(200).json({ message: 'Task deleted' })
        } else {
            res.status(404).json({ message: 'Tasks not found' })
        }
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})