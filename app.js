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

        const delete_button = document.createElement('button');
        delete_button.innerText = 'Delete';
        delete_button.addEventListener('click', () => {
            new_li.remove();
        });

        new_li.appendChild(delete_button);
        list.appendChild(new_li);
        input_box.value = '';
    }
})