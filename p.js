// Add task
let taskInput = document.getElementById("new-task");
// First button
let addButton = document.getElementsByTagName("button")[0];
// UL of #incomplete-tasks
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
// Completed-tasks
let completedTaskHolder = document.getElementById("completed-tasks");

// Function to create a new task item
let createNewTaskElement = function(taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    label.innerText = taskString;

    // Set types for the input elements
    checkBox.type = "checkbox";
    editInput.type = "text";

    // Set button texts and classes
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    // Append elements to listItem
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

let addTask = function() {
    let listItem = createNewTaskElement(taskInput.value);
    if (taskInput.value.trim() === "") {
        return;
    }
    // Append list item to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

let editTask = function() {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("label");

    let containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode");
};

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
};

let taskCompleted = function() {
    let listItem = this.parentNode;
    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function() {
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

// For each incomplete task, bind events
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// For each completed task, bind events
for (let i = 0; i < completedTaskHolder.children.length; i++) {
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}