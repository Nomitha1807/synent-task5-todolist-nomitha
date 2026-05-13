const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const addSound = document.getElementById("addSound");
const doneSound = document.getElementById("doneSound");
const deleteSound = document.getElementById("deleteSound");

// Load tasks on refresh
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTask(taskText, false);
  addSound.play();
  saveTasks();

  taskInput.value = "";
}

function createTask(text, completed) {
  const li = document.createElement("li");

  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <div class="task-actions">
      <span onclick="deleteTask(this)">🗑️</span>
    </div>
  `;

  taskList.appendChild(li);
}

function toggleComplete(element) {
  element.parentElement.classList.toggle("completed");
  doneSound.play();
  saveTasks();
}

function deleteTask(element) {
  element.parentElement.parentElement.remove();
  deleteSound.play();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(task => {
    tasks.push({
      text: task.querySelector("span").innerText,
      completed: task.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
}