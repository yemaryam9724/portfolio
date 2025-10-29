// Menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('fa-xmark');
};

// Scroll to top button
const scrollTopBtn = document.querySelector('.footer-iconTop a');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Active section link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*=${id}]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  const header = document.querySelector('header');
  header.classList.toggle('sticky', top > 100);

  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Front-End Developer", "Web Developer", "Software Engineer"];
  const textElement = document.getElementById("animated-desc");

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const current = roles[roleIndex];
    if (!deleting) {
      textElement.textContent = "I'm a " + current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      textElement.textContent = "I'm a " + current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
  }

  typeEffect();
});

// Contact form submission with validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    emailError.textContent = "";
    phoneError.textContent = "";

    let valid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Phone validation (optional)
    const phonePattern = /^[0-9]{10,15}$/;
    if (phone && !phonePattern.test(phone)) {
      phoneError.textContent = "Phone number must be 10–15 digits.";
      valid = false;
    }

    if (!valid) return;

    // Show sending status
    status.textContent = "Sending... ";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thank you! Your message has been sent ";
        form.reset();
      } else {
        status.textContent = "Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "Network error. Please check your connection.";
    }
  });
});
