const addBtn = document.querySelector("#add-btn");
const taskContent = document.querySelector("#text-input");
const listTasks = document.querySelector(".ol-list");
let itemsArr = JSON.parse(localStorage.getItem('tasks')) || [];
let counter = itemsArr.length + 1;

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(itemsArr));
}

function updateList() {
    listTasks.innerHTML = '';
    itemsArr.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("list-item");

        const exitBtn = document.createElement('button');
        exitBtn.setAttribute("class", "exitBtn");
        exitBtn.innerText = "x";

        const counterText = document.createTextNode(index + 1 + ". ");
        li.appendChild(counterText);

        const itemText = document.createTextNode(task);
        li.appendChild(itemText);

        listTasks.appendChild(li);
        li.appendChild(exitBtn);

        exitBtn.addEventListener("click", () => {
            li.parentNode.removeChild(li);
            itemsArr.splice(index, 1);
            saveTasksToLocalStorage();
            updateList();
        });
    });
}

updateList();

addBtn.addEventListener("click", () => {
    const task = taskContent.value.trim();
    if (task !== '') {
        itemsArr.push(task);
        saveTasksToLocalStorage();
        updateList();
        taskContent.value = '';
    }
});
