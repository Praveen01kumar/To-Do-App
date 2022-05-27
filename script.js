// Declaration of constant
const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");
const filters = document.querySelectorAll(".nav-item");
const alertMessage = document.querySelector("#message");

let todoItems = [];

// Alert Message 
const alertMess = function (message, className) {
    alertMessage.innerHTML = message;
    alertMessage.classList.add(className, "show");
    alertMessage.classList.remove("hide");
    setTimeout(() => {
        alertMessage.classList.add("hide");
        alertMessage.classList.remove("show");
    }, 2000);
    return;
};
// update item
const updateItem = function (currentItemIndex, value) {
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    todoItems.splice(currentItemIndex, 1, newItem);
    setLoacalStorage(todoItems);
};
// Remove Items
const removeItem = function (item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
};
// Filter 
const getItemsFilter = function (type) {
    let filterItems = [];
    switch (type) {
        case "todo":
            filterItems = todoItems.filter((item) => !item.isDone);
            break;
        case "done":
            filterItems = todoItems.filter((item) => item.isDone);
            break;
        default:
            filterItems = todoItems;
    }
    getList(filterItems);
};
// done 
const handleItem = function (itemData) {
    const items = document.querySelectorAll(".list-group-item");
    items.forEach((item) => {
        if (item.querySelector('.title').getAttribute('data-time') == itemData.addedAt) {
            item.querySelector('[data-done]').addEventListener('click', function (e) {
                e.preventDefault();
                const itemIndex = todoItems.indexOf(itemData);
                const currentItem = todoItems[itemIndex];
                const currentClass = currentItem.isDone ? "fill" : "green";
                currentItem.isDone = currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLoacalStorage(todoItems);
                const iconClass = currentItem.isDone ? "fill" : "green";
                this.firstElementChild.classList.replace(currentClass, iconClass);
                const filterType = document.querySelector('#tbaValue').value;
                getItemsFilter(filterType);
            });
            // edit
            item.querySelector('[data-edit]').addEventListener('click', function (e) {
                e.preventDefault();
                inputItem.value = itemData.name;
                document.querySelector('#objIndex').value = todoItems.indexOf(itemData);
            });
            // deleted
            item.querySelector('[data-delete]').addEventListener('click', function (e) {
                e.preventDefault();
                if (confirm("Are You Sure You Want To Delete This Task?")) {
                    itemList.removeChild(item);
                    removeItem(item);
                    setLoacalStorage(todoItems);
                    alertMess("New Task Has Been Deleted", "alert-info");
                    return todoItems.filter((item) => item != itemData);
                }
            });
        }
    });
};
// Creating Element of data 
const getList = function (todoItems) {
    itemList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            const iconClass = item.isDone ? "fill" : "green";
            itemList.insertAdjacentHTML("beforeend", `
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="title" data-time="${item.addedAt}">${item.name}</span>
            <span>
                <a href="#" data-done><svg class="${iconClass}" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg></a>
                <a href="#" data-edit><svg class="blue" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg></a>
                <a href="#" data-delete><svg class="red" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></a>
            </span>
        </li>`
            );
            handleItem(item);
        });
    } else {

        itemList.insertAdjacentHTML("beforeend", `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span> No Record Found</span>
    </li>`
        );
    }
};
// Geting data from Locale Storage
const getLoaclStorage = function () {
    const todoStorage = localStorage.getItem("todoItems");
    if (todoStorage === "undefined" || todoStorage === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
    }
    getList(todoItems);
};
// Seting data in Locale Storage
const setLoacalStorage = function (todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = inputItem.value.trim();
        if (itemName.length === 0) {
            alertMess("Enter Task Name...", "alert-danger");
        } else {
            const currentItemIndex = document.querySelector('#objIndex').value;
            if (currentItemIndex) {
                updateItem(currentItemIndex, itemName);
                document.querySelector('#objIndex').value = "";
                alertMess("New Task Has Been Updated", "alert-success");
            } else {
                const itemObj = {
                    name: itemName,
                    isDone: false,
                    addedAt: new Date().getTime(),
                };
                todoItems.push(itemObj);
                setLoacalStorage(todoItems);
                alertMess("New Task Has Been Added", "alert-success");
            }
            getList(todoItems);
        }
        inputItem.value = "";
    });
    // filttering data 
    filters.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            const tabType = this.getAttribute("data-type");
            document.querySelectorAll('.nav-link').forEach((nav) => {
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            getItemsFilter(tabType);
            document.querySelector('#tbaValue').value = tabType;
        });
    });
    getLoaclStorage();
});