// Creating Query Selectors
const button = document.querySelector('#add_task');
const input_box = document.querySelector('#input_box');
const list = document.querySelector('#list');

// If button clicked add Task
button.addEventListener('click', () => {
    const task_text = input_box.value.trim(); // Rid white space

    // Verifying Input
    if (task_text !== '') {
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

        const delete_button = document.createElement('button');
        delete_button.innerText = 'X';
        delete_button.style.backgroundColor = '#cfbaf0';
        delete_button.style.border = '1.5px solid #8e89f1'
        delete_button.style.borderRadius = '5px';
        delete_button.style.cursor = 'pointer';
        delete_button.addEventListener('click', () => {
            new_li.remove();
        });

        new_li.appendChild(delete_button);
        list.appendChild(new_li);
        input_box.value = '';
    }
})

// Front-end Logic
fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
    
    })