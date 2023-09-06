// Wait for the page to fully load before executing the code
window.addEventListener('load', () => {
    // Get the input element and "Add" button
    const input = document.getElementById('input');
    const addBtn = document.getElementById('btn');
    // Get the result container
    const result = document.querySelector('.result');

    // Load existing data from local storage
    readData();

    // localStorage.clear();

    // Attach a click event listener to the "Add" button
    addBtn.addEventListener('click', () => {
        // Trim the input value
        let inputMess = input.value.trim();
        // Check if the input is not empty
        if (inputMess !== "") {
            // Create and display the new task
            disp(inputMess);
            // Clear the input field
            input.value = "";
            // Save the updated data to local storage
            saveData();
        }
    });
});

// Function to create and display a new task
function disp(message) {
    const result = document.querySelector('.result');

    // Create a container for the task
    const tasks = document.createElement('div');
    tasks.className = "tasks";

    // Create an <li> element for the task message
    let mess = document.createElement('li');
    mess.textContent = message;

    // Create a container for buttons
    let btnDiv = document.createElement('div');
    btnDiv.className = 'btn-container';

    // Create a "Delete" button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = "delete";

    // Create a "Done" button
    let doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = "done";

    // Assemble the task structure
    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(doneBtn);
    tasks.appendChild(mess);
    tasks.appendChild(btnDiv);

    // Add the task to the result container
    result.appendChild(tasks);

    // Attach event listener for deleting the task
    deleteBtn.addEventListener('click', () => {
        const tasks = deleteBtn.closest('.tasks');
        result.removeChild(tasks);
        saveData();
    });

    // Attach event listener for marking the task as done
    doneBtn.addEventListener('click', () => {
        mess.style.textDecoration = "line-through";
        mess.style.color = "#fff";
        mess.style.fontWeight = "bold";
        // mess.style.fontWeight = "bold";
        saveData();
    });
}

// Function to save task data to local storage
function saveData() {
    const result = document.querySelector('.result');
    localStorage.setItem("data", result.innerHTML);
}

// Function to read and load task data from local storage
function readData() {
    const result = document.querySelector('.result');
    result.innerHTML = localStorage.getItem("data");

    // Attach event listeners to newly created elements after reading data
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tasks = button.closest('.tasks');
            result.removeChild(tasks);
            saveData();
        });
    });

    const doneButtons = document.querySelectorAll('.done');
    doneButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mess = button.closest('.tasks').querySelector('li');
            mess.style.textDecoration = "line-through";
            mess.style.color = "#fff";
            mess.style.fontWeight = "bold";
            saveData();
        });
    });
}