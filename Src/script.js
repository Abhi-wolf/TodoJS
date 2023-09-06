
window.addEventListener('load', () => {
    const input = document.getElementById('input');
    console.log(input);
    const addBtn = document.getElementById('btn');
    console.log(input);
    const result = document.querySelector('.result');
    console.log(result);
    // localStorage.clear();
    readData();

    addBtn.addEventListener('click', () => {
        // console.log(input.value);
        let inputMess = input.value.trim();
        console.log(inputMess);

        if (inputMess != "") {
            disp(inputMess);
            input.value = "";
            saveData();
        }
    })

    saveData();
})



function disp(message) {
    const tasks = document.createElement('div');
    tasks.className = "tasks";
    const result = document.querySelector('.result');


    let mess = document.createElement('li');
    mess.textContent = message;
    let btnDiv = document.createElement('div');
    btnDiv.setAttribute('id', 'delete-done');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = "delete";
    // deleteBtn.setAttribute('class', 'delete');
    let doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    // doneBtn.setAttribute('class', 'done');
    doneBtn.className = "done";

    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(doneBtn);
    tasks.appendChild(mess);
    tasks.appendChild(btnDiv);

    result.appendChild(tasks);
    console.log('appended');
    tasks.style.display = "flex";
    // saveData();

    deleteBtn.addEventListener('click', () => {
        result.removeChild(tasks);
        saveData();
    });
    doneBtn.addEventListener('click', () => {
        mess.style = "text-decoration: line-through";
        saveData();
    });
    return;
}


function saveData() {
    const result = document.querySelector('.result');
    localStorage.setItem("data", result.innerHTML);
}

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
            saveData();
        });
    });
} 


