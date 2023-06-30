const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value;
  if (task) {
    addTask(task);
    taskInput.value = "";
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    deleteTask(e.target.parentElement);
  }
});

function addTask(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.textContent = task;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
}
