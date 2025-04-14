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

document.querySelectorAll('a, button, .task-item').forEach(element => {
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

// Todo List Functionality
const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim()) {
        addTask(taskText);
        document.getElementById('taskInput').value = '';
    }
});

function addTask(text) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    todoList.insertBefore(taskItem, todoList.firstChild);
    
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
    const elements = document.querySelectorAll('.hero, .todo-form, .task-item, .footer-links, .social-links');
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