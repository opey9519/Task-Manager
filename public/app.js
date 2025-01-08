// Creating Query Selectors
const add_button = document.querySelector('#add_task');
const update_button = document.querySelector('#update_button')
const input_box = document.querySelector('#input_box');
const date_box = document.querySelector('#date_box');
const list = document.querySelector('#list');


// If button clicked add Task
add_button.addEventListener('click', () => {
    const task_text = input_box.value.trim();
    const date_text = date_box.value.trim();

    // Verifying Input
    if ((task_text !== '') && (date_text !== '')) {

        // Create New Task
        const new_li = document.createElement('li');
        new_li.innerText = task_text;
        new_li.classList.add('list_item')

        // Create Delete Button
        const delete_button = document.createElement('button');
        delete_button.innerText = 'X';
        delete_button.classList.add('button')
        delete_button.id = 'delete_button';
        delete_button.addEventListener('click', () => {
            new_li.remove();
        });

        // Create Date Due
        const new_p = document.createElement('p');
        new_p.innerText = date_text;
        new_p.style.backgroundColor = '#cfbaf0';

        // Append elements to document
        new_li.appendChild(delete_button);
        new_li.appendChild(new_p);
        list.appendChild(new_li);
    }
})

// Creats Update Form on Click
update_button.addEventListener('click', (event) => {
    const list_item = event.target.closest('li'); // Obtain li element
    const list_id = list_item.dataset.id; // Obtain mongoDB _id

    // Create update form
    const update_form = document.createElement('form');
    update_form.method = 'POST';
    update_form.action = `/tasks/${list_id}/edit?_method=PATCH`;

    // Create update task input
    const update_task = document.createElement('input');
    update_task.name = 'task';
    update_task.type = 'text';

    // Create update date input
    const update_date = document.createElement('input');
    update_date.name = 'date';
    update_date.type = 'date';

    // Create submission button
    const submit_button = document.createElement('button');
    submit_button.type = 'submit';
    submit_button.innerText = 'S'
    submit_button.classList.add('button')

    // Append created elements
    list_item.appendChild(update_form);
    update_form.appendChild(update_task);
    update_form.appendChild(update_date);
    update_form.appendChild(submit_button);

    // Form submission 
    update_form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updated_task = update_task.value.trim();
        const updated_date = update_date.value.trim();

        try {
            const response = await fetch(`/tasks/${list_id}/edit`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: updated_task, date: updated_date })
            });

            if (response.ok) {
                const updatedTask = await response.json()
                list_item.firstChild.textContent = updatedTask.name;
                list_item.querySelector('p').innerText = updatedTask.date;
                update_form.remove();
            }
        }
        catch (error) {
            console.log("Error updating task:", error);
        }

    })

})

// Update Text Boxes
input_box.value = '';
date_box.value = '';