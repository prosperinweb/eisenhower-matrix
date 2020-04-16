const forms = document.querySelectorAll("form");
const listContainers = document.querySelectorAll(".list-container");
let order = 0;

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = form.firstElementChild;
    const listContainer = form.nextElementSibling;
    if (taskInput.value.trim()) {
      const taskItem = document.createElement("li");
      taskItem.setAttribute("draggable", true);
      taskItem.setAttribute("class", "task-item");
      taskItem.setAttribute("id", `${listContainer.id}-${order}`);
      taskItem.textContent = taskInput.value;
      taskItem.addEventListener("dragstart", dragStart);
      listContainer.appendChild(taskItem);
      taskInput.value = "";
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
  sourceContainerId = this.parentElement.id;
}

function dropped(e) {
  let id;
  e.target.classList.remove("over");
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

function dragLeave(e) {
  e.target.classList.remove("over");
}

function deleteItem(e) {
  console.log(e.target);
}

function cancel(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  if (e.type === "dragover") {
    e.target.classList.add("over");
  } else if (e.type === "dragleave" || e.type === "drop") {
    e.target.classList.remove("over");
  }
  return false;
}

listContainers.forEach((listContainer) => {
  listContainer.addEventListener("drop", dropped);
  listContainer.addEventListener("dragenter", cancel);
  listContainer.addEventListener("dragover", cancel);
  listContainer.addEventListener("dragleave", cancel);
});
