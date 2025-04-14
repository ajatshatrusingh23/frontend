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

document.querySelectorAll('a, button, .contact-item').forEach(element => {
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

// Contact List Functionality
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('emailInput').value;
    if (name.trim() && phone.trim() && email.trim()) {
        addContact(name, phone, email);
        document.getElementById('nameInput').value = '';
        document.getElementById('phoneInput').value = '';
        document.getElementById('emailInput').value = '';
    }
});

function addContact(name, phone, email) {
    const contactItem = document.createElement('div');
    contactItem.classList.add('contact-item');
    contactItem.innerHTML = `
        <div class="contact-details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
        </div>
        <div>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    contactList.insertBefore(contactItem, contactList.firstChild);
    
    // Animate in
    setTimeout(() => contactItem.classList.add('visible'), 10);

    // Edit Contact
    contactItem.querySelector('.edit-btn').addEventListener('click', () => {
        const newName = prompt('Edit Name:', name);
        const newPhone = prompt('Edit Phone:', phone);
        const newEmail = prompt('Edit Email:', email);
        if (newName && newPhone && newEmail) {
            contactItem.querySelector('.contact-details').innerHTML = `
                <p><strong>Name:</strong> ${newName}</p>
                <p><strong>Phone:</strong> ${newPhone}</p>
                <p><strong>Email:</strong> ${newEmail}</p>
            `;
        }
    });

    // Delete Contact with Animation
    contactItem.querySelector('.delete-btn').addEventListener('click', () => {
        contactItem.style.transform = 'scale(0.9)';
        contactItem.style.opacity = '0';
        setTimeout(() => contactItem.remove(), 500);
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
    const elements = document.querySelectorAll('.hero, .contact-form, .contact-item, .footer-links, .social-links');
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