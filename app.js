// Academic Workspace State & Interactivity
let courses = [
  { name: "Database Systems", credits: 3, grade: 4.0 },
  { name: "Algorithms & DS", credits: 4, grade: 3.75 }
];

let tasks = [
  { id: 1, text: "Finish Lab 4 report on Binary Search Trees", done: false },
  { id: 2, text: "Review Chapter 5 SQL Aggregations & Joins", done: true }
];

function calculateGPA() {
  let totalCredits = 0;
  let totalPoints = 0;
  courses.forEach(c => {
    totalCredits += c.credits;
    totalPoints += (c.credits * c.grade);
  });
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById("gpaDisplay").innerText = gpa;
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "task-item" + (t.done ? " completed" : "");
    li.innerHTML = `
      <span onclick="toggleTask(${t.id})" style="cursor:pointer;">
        ${t.done ? "✅" : "⭕"} ${t.text}
      </span>
      <button onclick="deleteTask(${t.id})">✕</button>
    `;
    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

document.getElementById("addCourseBtn").addEventListener("click", () => {
  const name = document.getElementById("courseInput").value.trim() || "New Subject";
  const credits = parseFloat(document.getElementById("creditInput").value) || 3;
  const grade = parseFloat(document.getElementById("gradeInput").value) || 4.0;
  courses.push({ name, credits, grade });
  document.getElementById("courseInput").value = "";
  calculateGPA();
});

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  if (input.value.trim()) {
    tasks.push({ id: Date.now(), text: input.value.trim(), done: false });
    input.value = "";
    renderTasks();
  }
});

// Initial Setup
calculateGPA();
renderTasks();
console.log("Student Academic App initialized successfully!");
