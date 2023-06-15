(() => {

    const input = document.getElementById("addTodo-input");
    const inputBtn = document.querySelector(".addTodo-btn");

    const todoList = document.getElementById("todo");

    function add() {
        const inputMsg = input.value; 
        const newId = inputMsg.toLowerCase().split(" ").join("");
        // Check if there is an existing task with the same id
        const existingTasks = document.querySelectorAll(".kb-item");
        for (let i = 0; i < existingTasks.length; i++) {
            if (existingTasks[i].id === newId) {
            // Alert or display an error message here
            alert("This task is already added!");
            return; // Stop execution if a task with the same id is found
            }
        }

        const newTodo = `<div class="kb-item" id="${newId}" draggable="true" ondragstart="onDrag(event)"><span>${inputMsg}</span></div>`;

        todoList.insertAdjacentHTML("afterbegin",newTodo);
        input.value = "";
    }

    function run() {
        inputBtn.addEventListener("click", add);
        input.addEventListener("keypress", (event) => {
            if (event.key === 'Enter' && input.value !== "") {
                event.preventDefault();
                add();
            }
        });
    }

    run();
})();

function onDrag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function onDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let targetList = document.getElementById(data);
    let targetElement = event.target;
  
    // Check if the target element is the kb-list or its immediate parent
    if (targetElement.classList.contains("kb-list")) {
        targetElement.appendChild(targetList);
    } else if (targetElement.parentElement.classList.contains("kb-list")) {
        targetElement.parentElement.appendChild(targetList);
    } else if (targetElement.classList.contains("kb-remove")) {
        // Remove the draggable div from the screen
        targetList.remove();
    }
    else {
        // Traverse up the DOM tree to find the nearest kb-list element
        while (targetElement.parentElement) {
            targetElement = targetElement.parentElement;
            if (targetElement.classList.contains("kb-list")) {
                targetElement.appendChild(targetList);
                break;
            }
        }
    }
}

function allowDrop(event) {
    event.preventDefault();
}