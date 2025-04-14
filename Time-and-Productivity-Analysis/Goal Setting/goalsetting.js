// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

document.querySelectorAll('a, button, .goal-card').forEach(element => {
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

// Goal Form Submission
document.getElementById('goalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('goalName').value;
    const description = document.getElementById('goalDescription').value;
    const deadline = document.getElementById('goalDeadline').value;

    const goalCard = document.createElement('div');
    goalCard.classList.add('goal-card');
    goalCard.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <span class="deadline">Deadline: ${new Date(deadline).toLocaleDateString()}</span>
        <button class="delete-btn">X</button>
    `;
    
    const grid = document.getElementById('goalsGrid');
    grid.insertBefore(goalCard, grid.firstChild);
    
    setTimeout(() => goalCard.classList.add('visible'), 10);

    // Clear form
    this.reset();

    // Add delete functionality
    goalCard.querySelector('.delete-btn').addEventListener('click', () => {
        goalCard.classList.remove('visible');
        setTimeout(() => goalCard.remove(), 300);
    });
});

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
    const elements = document.querySelectorAll('.hero, .goal-input h2, #goalForm, .goal-list h2, .goal-card, .footer-links, .newsletter');
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