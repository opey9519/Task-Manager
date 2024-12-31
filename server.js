const express = require('express');
const app = express();
const port = 3000;

// Parses incoming JSON data to request.body
app.use(express.json());

// Temporary database
const tasks = [];


// Get all tasks from database (temp)
app.get('/tasks', (request, response) => {
    response.json(tasks);
});

app.post('/tasks', (request, response) => {

})

// Delete task based on id number
app.delete('/tasks:id', (request, response) => {
    const id_num = parseInt(request.params.id);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id_num) {
            tasks.splice(id_num, 1);
            response.status(200).json({ message: 'Task deleted' })
        } else {
            response.status(404).json({ message: 'Tasks not found' })
        }
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})