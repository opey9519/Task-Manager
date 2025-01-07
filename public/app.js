// Creating Query Selectors
const button = document.querySelector('#add_task');
const update_button = doucment.querySelector('#update_button')
const input_box = document.querySelector('#input_box');
const date_box = document.querySelector('#date_box');
const list = document.querySelector('#list');


// If button clicked add Task
button.addEventListener('click', () => {
    const task_text = input_box.value.trim();
    const date_text = input_box.value.trim();

    // Verifying Input
    if (task_text !== '') {

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
update_button.addEventListener('click', () => {
    const new_form = document.createElement('form');
    const update_task = document.createElement('input');
    const update_date = document.createElement('input');
    const submit_button = document.createElement('button');



    new_li.appendChild(new_form);
    new_form.appendChild(update_task);
    new_form.appendChild(update_date);
    new_form.appendChild(submit_button);
})

// Update Text Boxes
input_box.value = '';
date_box.value = '';