// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

document.querySelectorAll('a, button, .premium-card').forEach(element => {
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
    checkMembershipStatus();
    handleScroll();
});

// Simulated Membership Check (Replace with real auth later)
function checkMembershipStatus() {
    // For demo: Assume user is premium if 'isPremium' is set in localStorage
    const isPremium = localStorage.getItem('isPremium') === 'true'; // Set this via login system
    const nonMemberView = document.getElementById('non-member-view');
    const memberView = document.getElementById('member-view');

    if (isPremium) {
        nonMemberView.style.display = 'none';
        memberView.style.display = 'block';
    } else {
        nonMemberView.style.display = 'block';
        memberView.style.display = 'none';
    }
}

// Fix Navbar Links (Redirect to Other Pages)
document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        window.location.href = href;
    });
});

// Scroll Animations
function handleScroll() {
    const elements = document.querySelectorAll('.hero, .non-member-teaser, .premium-card, .footer-links, .newsletter');
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

// For demo purposes: Toggle premium status manually (remove this in production)
document.addEventListener('keydown', (e) => {
    if (e.key === 'p') { // Press 'p' to toggle premium status
        const isPremium = localStorage.getItem('isPremium') === 'true';
        localStorage.setItem('isPremium', !isPremium);
        checkMembershipStatus();
    }
});