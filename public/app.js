// Creating Query Selectors
const button = document.querySelector('#add_task');
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
        new_li.style.display = 'flex'
        new_li.style.backgroundColor = '#cfbaf0'
        new_li.style.fontSize = '1.25em';
        new_li.style.paddingLeft = '.5em'
        new_li.style.alignItems = 'center'
        new_li.style.justifyContent = 'space-between'
        new_li.style.borderRadius = '5px'
        new_li.style.border = '1px solid #8e89f1'

        // Create Delete Button
        const delete_button = document.createElement('button');
        delete_button.innerText = 'X';
        delete_button.style.backgroundColor = '#cfbaf0';
        delete_button.style.border = '1.5px solid #8e89f1'
        delete_button.style.borderRadius = '5px';
        delete_button.style.cursor = 'pointer';
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

// Update Text Boxes
input_box.value = '';
date_box.value = '';