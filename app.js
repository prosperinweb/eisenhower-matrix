const forms = document.querySelectorAll("form");
const listContainers = document.querySelectorAll(".list-container");
const taskItems = document.querySelectorAll(".task-item");
let order = 0;

forms.forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const taskInput = form.firstElementChild;
    const listContainer = form.nextElementSibling;
    if (taskInput.value.trim()) {
      const taskItem = document.createElement("li");
      taskItem.setAttribute("draggable", true);
      taskItem.setAttribute("class", "task-item");
      taskItem.setAttribute("id", `${listContainer.id}-${order}`);
      taskItem.textContent = taskInput.value;
      taskInput.value = "";
      listContainer.appendChild(taskItem);
      console.log(taskItem.id);
      order++;
    } else {
      taskInput.value = "";
    }
  });
});

let sourceContainerId;

function dragStart(e) {
  // IE does not support text/plain
  try {
    e.dataTransfer.setData("text/plain", e.target.id);
  } catch (error) {
    e.dataTransfer.setData("Text", e.target.id);
  }
  console.log(this);
  sourceContainerId = this.parentElement.id;
}

function dropped(e) {
  let id;
  console.log("Source: " + sourceContainerId);
  console.log("Target: " + this.id);
  if (this.id !== sourceContainerId) {
    cancel(e);
    try {
      id = e.dataTransfer.getData("text/plain");
    } catch (error) {
      id = e.dataTransfer.getData("Text");
    }
    let taskId = `#${id}`;
    e.target.appendChild(document.querySelector(taskId));
  }
}

function cancel(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  return false;
}

taskItems.forEach(taskItem => {
  taskItem.addEventListener("dragstart", dragStart);
});

listContainers.forEach(listContainer => {
  listContainer.addEventListener("drop", dropped);
  listContainer.addEventListener("dragenter", cancel);
  listContainer.addEventListener("dragover", cancel);
});
