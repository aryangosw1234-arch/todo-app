let tasks = [];

// ➕ Add task
function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if (taskText === "") return;

  let task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);

  saveTasks();
  showTasks();

  input.value = "";
}

// 💾 Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 📦 Load from localStorage
function loadTasks() {
  let saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// 👀 Show tasks on screen
function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // ✅ Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // ✅ Text
    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // 🔁 Toggle complete
    checkbox.onchange = function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      showTasks();
    };

    // ❌ Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// 🚀 Run when page loads
window.onload = function () {
  loadTasks();
  showTasks();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}