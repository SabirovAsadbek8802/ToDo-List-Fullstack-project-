const addBtn = document.querySelector("#add-btn");
const taskContent = document.querySelector("#text-input");
const listTasks = document.querySelector(".ol-list");
let itemsArr = [];
let counter = 1; // Initialize counter variable

addBtn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.classList.add("list-item");

    const exitBtn = document.createElement('button');
    exitBtn.setAttribute("class", "exitBtn");
    exitBtn.innerText = "x";

    // Append counter number to the li element
    const counterText = document.createTextNode(counter + ". ");
    li.appendChild(counterText);
    counter++;

    const itemText = document.createTextNode(taskContent.value);
    li.appendChild(itemText);

    itemsArr.push(li);

    listTasks.appendChild(li);
    li.appendChild(exitBtn);

    exitBtn.addEventListener("click", () => {
        li.parentNode.removeChild(li);
        const index = itemsArr.indexOf(li);
        if (index > -1) {
            itemsArr.splice(index, 1);
            // Update counter and reassign numbers to remaining items
            counter = 1;
            itemsArr.forEach(item => {
                item.childNodes[0].textContent = counter + ". ";
                counter++;
            });
        }
    });
});
