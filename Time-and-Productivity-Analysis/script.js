// Custom Cursor with Glow
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });
});

document.querySelectorAll('a, button, .feature-card, .benefit-item, .testimonial-card, .step-item, .stat-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorGlow.style.opacity = '1';
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorGlow.style.opacity = '0.7';
    });
});

// Scroll Progress Bar
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
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
    handleScroll(); // Trigger initial scroll check
});

// Tooltips for Feature Cards
document.querySelectorAll('.feature-card').forEach(card => {
    const tooltipText = card.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = tooltipText;
    card.appendChild(tooltip);

    card.addEventListener('click', () => {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => card.style.transform = 'scale(1)', 200);
    });
});

// Comment Submission with Animation
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;
    const commentName = document.getElementById('commentName').value;
    const newCard = document.createElement('div');
    newCard.classList.add('testimonial-card');
    newCard.innerHTML = `
        <p>"${commentText}"</p>
        <h4>- ${commentName}</h4>
    `;
    const grid = document.getElementById('testimonialGrid');
    grid.insertBefore(newCard, grid.firstChild);
    setTimeout(() => {
        newCard.classList.add('visible');
        newCard.style.transform = 'rotateY(360deg)';
    }, 10);
    document.getElementById('commentText').value = '';
    document.getElementById('commentName').value = '';
});

// Scroll Animations
function handleScroll() {
    const elements = document.querySelectorAll(
        '.hero, .features h2, .feature-card, .testimonials h2, .testimonial-card, .comment-form, ' +
        '.why-us h2, .why-us p, .benefit-item, .cta-section h2, .cta-section p, .cta-buttons, ' +
        '.footer-links, .newsletter, .social-links, .how-it-works h2, .how-it-works p, .step-item, ' +
        '.stats h2, .stats p, .stat-item'
    );
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.8) {
            element.classList.add('visible');
            if (element.classList.contains('benefit-item')) {
                element.style.transform = 'translateX(0)';
            }
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Floating Action Button
const fab = document.getElementById('fab');
fab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fab.style.transform = 'rotate(360deg)';
    setTimeout(() => fab.style.transform = 'rotate(0deg)', 600);
});

// Logout Functionality
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    fetch('backend/logout.php', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html';
        }
    })
    .catch(error => console.error('Error:', error));
});