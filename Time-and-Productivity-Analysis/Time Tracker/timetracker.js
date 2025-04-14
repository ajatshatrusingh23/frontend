// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

document.querySelectorAll('a, button, .activity-card').forEach(element => {
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

// Time Tracker Functionality
document.getElementById('trackerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const activityName = document.getElementById('activityName').value;
    const startBtn = this.querySelector('.start-btn');
    const isTracking = startBtn.classList.contains('active');

    if (!isTracking) {
        const activityCard = document.createElement('div');
        activityCard.classList.add('activity-card');
        activityCard.innerHTML = `
            <h3>${activityName}</h3>
            <span class="timer">00:00:00</span>
            <button class="stop-btn">X</button>
        `;

        const grid = document.getElementById('activitiesGrid');
        grid.insertBefore(activityCard, grid.firstChild);

        setTimeout(() => activityCard.classList.add('visible'), 10);

        let seconds = 0;
        const timerElement = activityCard.querySelector('.timer');
        const interval = setInterval(() => {
            seconds++;
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);

        activityCard.querySelector('.stop-btn').addEventListener('click', () => {
            clearInterval(interval);
            activityCard.classList.remove('visible');
            setTimeout(() => activityCard.remove(), 300);
            startBtn.classList.remove('active');
            startBtn.textContent = 'Start';
            document.getElementById('activityName').disabled = false;
        });

        startBtn.classList.add('active');
        startBtn.textContent = 'Tracking...';
        document.getElementById('activityName').disabled = true;
    }
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
    const elements = document.querySelectorAll('.hero, .tracker-input h2, #trackerForm, .tracker-list h2, .activity-card, .footer-links, .newsletter');
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