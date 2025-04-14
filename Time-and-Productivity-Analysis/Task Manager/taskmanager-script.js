// Cursor Animation
const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');
let lastX = 0, lastY = 0;

function updateCursor(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    
    const trailX = lastX + (x - lastX) * 0.5;
    const trailY = lastY + (y - lastY) * 0.5;
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
    
    lastX = trailX;
    lastY = trailY;
}

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateCursor(e));
});

document.querySelectorAll('a, button, .project-item, .task-item').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Theme Toggle (Sun/Moon)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Load Theme Preference on Page Load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    handleScroll();
});

// Task Manager Functionality
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const projectName = document.getElementById('projectInput').value;
    const taskText = document.getElementById('taskInput').value;
    if (projectName.trim() && taskText.trim()) {
        addProject(projectName, taskText);
        document.getElementById('projectInput').value = '';
        document.getElementById('taskInput').value = '';
    }
});

function addProject(projectName, initialTask) {
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.innerHTML = `
        <h3>${projectName}</h3>
        <div class="tasks-container"></div>
        <button class="delete-project-btn">Delete Project</button>
    `;
    taskList.insertBefore(projectItem, taskList.firstChild);
    
    // Animate in
    setTimeout(() => projectItem.classList.add('visible'), 10);

    // Add initial task
    addTask(projectItem.querySelector('.tasks-container'), initialTask);

    // Delete Project with Animation
    projectItem.querySelector('.delete-project-btn').addEventListener('click', () => {
        projectItem.style.transform = 'scale(0.9)';
        projectItem.style.opacity = '0';
        setTimeout(() => projectItem.remove(), 500);
    });
}

function addTask(container, text) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    container.appendChild(taskItem);
    
    // Animate in
    setTimeout(() => taskItem.classList.add('visible'), 10);

    // Complete Task
    taskItem.querySelector('.complete-btn').addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    // Delete Task with Animation
    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        taskItem.style.transform = 'scale(0.9)';
        taskItem.style.opacity = '0';
        setTimeout(() => taskItem.remove(), 500);
    });
}

// Fix Navbar Links (Redirect to Other Pages)
document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        window.location.href = href; // Simply redirect to the linked page
    });
});

// Scroll Animations
function handleScroll() {
    const elements = document.querySelectorAll('.hero, .task-form, .project-item, .footer-links, .social-links');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);