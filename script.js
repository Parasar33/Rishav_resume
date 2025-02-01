// DOM Elements
const typedText = document.querySelector(".typed-text");
const greetingText = document.getElementById("greeting");
const themeToggle = document.getElementById('theme-toggle');
const progressBar = document.getElementById('progress-bar');
const menu = document.getElementById('menu');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const works = document.querySelectorAll('.work');
const form = document.querySelector('.form');

// Typing Animation Phrases
const phrases = [
    "Java Swing Developer. ",
    "Backend Developer. ",
    "Machine Learning Student. ",
    "Problem Solver. "
];

let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTyping = false;

// Typing Animation Function
function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(type, 500); // Pause before next phrase
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Dynamic Greeting based on time
function getGreeting() {
    const hours = new Date().getHours();
    if (hours < 5) return "Hallo, Gute Nacht";
    if (hours < 12) return "Hallo, Guten Morgen";
    if (hours < 18) return "Hallo, Guten Tag";
    if (hours < 21) return "Hallo, Guten Abend";
    return "Hallo, Gute Nacht";
}

// Theme Toggle
function handleTheme() {
    document.documentElement.setAttribute('data-theme', 
        themeToggle.checked ? 'light' : 'dark'
    );
    localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
}

// Scroll Progress
function updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
}

// Project Filter
function filterProjects(category) {
    works.forEach(work => {
        const workCategory = work.dataset.category;
        if (category === 'all' || workCategory === category) {
            work.style.display = 'block';
            work.classList.add('fade-in');
        } else {
            work.style.display = 'none';
            work.classList.remove('fade-in');
        }
    });
}

// Form Handling
function handleForm(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const msg = document.getElementById('msg');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: "96aa8c67-1d0c-4c95-9c14-62367857e1b1",
            name: form.querySelector('input[name="Name"]').value,
            email: form.querySelector('input[name="Email"]').value,
            message: form.querySelector('textarea[name="Message"]').value
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            msg.innerHTML = "Message sent successfully";
            msg.style.color = "var(--sky)";
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        msg.innerHTML = "Error sending message. Please try again.";
        msg.style.color = "#ff4444";
        console.error('Error:', error);
    })
    .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set initial greeting
    greetingText.textContent = getGreeting();
    
    // Start typing animation
    setTimeout(type, 200);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    }
});

// Scroll events
window.addEventListener('scroll', () => {
    updateProgress();
    
    // Show/hide scroll to top button
    const topButton = document.querySelector('.top');
    topButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Menu toggle
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('toggle');
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        header.classList.remove('toggle');
        menu.classList.remove('fa-times');
    }
});

// Theme toggle
themeToggle.addEventListener('change', handleTheme);

// Project filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        filterProjects(btn.dataset.filter);
    });
});

// Form submission
form.addEventListener('submit', handleForm);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        if (window.innerWidth < 991) {
            header.classList.remove('toggle');
            menu.classList.remove('fa-times');
        }
    });
});

// jQuery for additional smooth animations
$(document).ready(function() {
    // Add animation classes on scroll
    $(window).scroll(function() {
        $('.work').each(function() {
            if ($(this).isInViewport()) {
                $(this).addClass('slide-up');
            }
        });
    });
});

// Utility function to check if element is in viewport
$.fn.isInViewport = function() {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};