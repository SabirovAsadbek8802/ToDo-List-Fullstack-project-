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
    itemsArr.forEach((taskObj, index) => {
        const task = taskObj.task;
        const isDone = taskObj.done;

        const li = document.createElement("li");
        li.classList.add("list-item");
        if (isDone) {
            li.classList.add("done");
        }

        const exitBtn = document.createElement('button');
        exitBtn.setAttribute("class", "exitBtn");
        exitBtn.innerText = "x";

        const doneBtn = document.createElement("button")
        doneBtn.setAttribute("class", "doneBtn")
        doneBtn.innerText = "✔️"

        const btnsDiv = document.createElement("div")
        btnsDiv.classList.add("btnsDiv")

        const counterText = document.createTextNode(index + 1 + ". ");
        li.appendChild(counterText);

        const itemText = document.createTextNode(task);
        li.appendChild(itemText);

        listTasks.appendChild(li);
        li.appendChild(btnsDiv)
        btnsDiv.appendChild(doneBtn);
        btnsDiv.appendChild(exitBtn);

        doneBtn.addEventListener("click", () => {
            li.classList.toggle("done");
            itemsArr[index].done = !itemsArr[index].done;
            saveTasksToLocalStorage();
        });

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
        itemsArr.push({ task: task, done: false });
        saveTasksToLocalStorage();
        updateList();
        taskContent.value = '';
    }
});
