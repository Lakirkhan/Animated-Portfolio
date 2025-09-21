// Import Toastify library
const Toastify = window.Toastify

// Import emailjs library
const emailjs = window.emailjs

const typedTextSpan = document.querySelector("#typed-text")
const cursorSpan = document.querySelector(".cursor")

const textArray = [
  "Full Stack Developer",
  "React.js Developer",
  "Laravel Developer",
  "Software Engineer",
  "Problem Solver",
  "Tech Enthusiast",
  "Frontend Developer",
  "Backend Developer",
]
const typingDelay = 100
const erasingDelay = 50
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, typingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, erasingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTimeout(type, typingDelay + 1100)
  }
}

function createParticles() {
  const particlesContainer = document.getElementById("particles-js")
  const particleCount = 80

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    const size = Math.random() * 3 + 1
    const opacity = Math.random() * 0.5 + 0.2
    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(96, 165, 250, ${opacity});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 15 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `
    particlesContainer.appendChild(particle)
  }
}

// Enhanced particle animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize particles
createParticles()

const themeToggle = document.getElementById("theme-toggle")
const body = document.body
const themeIcon = themeToggle.querySelector("i")

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark"
if (currentTheme === "light") {
  body.setAttribute("data-theme", "light")
  themeIcon.classList.replace("fa-moon", "fa-sun")
}

themeToggle.addEventListener("click", () => {
  const isLight = body.getAttribute("data-theme") === "light"

  if (isLight) {
    body.removeAttribute("data-theme")
    themeIcon.classList.replace("fa-sun", "fa-moon")
    localStorage.setItem("theme", "dark")
    showToast("Switched to dark mode", "info")
  } else {
    body.setAttribute("data-theme", "light")
    themeIcon.classList.replace("fa-moon", "fa-sun")
    localStorage.setItem("theme", "light")
    showToast("Switched to light mode", "info")
  }
})

// Navigation
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`)

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) navLink.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

// Add reveal class to elements
function addRevealClass() {
  const elementsToReveal = [
    ".about-content",
    ".timeline-item",
    ".skill-item",
    ".project-card",
    ".achievement-item",
    ".experience-item",
    ".contact-content",
  ]

  elementsToReveal.forEach((selector) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      element.classList.add("reveal")
    })
  })
}

// Initialize reveal animations
addRevealClass()

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stats counter animation
      if (entry.target.classList.contains("about-stats")) {
        animateCounters()
      }

      // Skill bars animation
      if (entry.target.classList.contains("skills-content")) {
        animateSkillBars()
      }

      // General reveal animation
      if (entry.target.classList.contains("reveal")) {
        entry.target.classList.add("active")
      }
    }
  })
}, observerOptions)

function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    className: `toast-${type}`,
    stopOnFocus: true,
    style: {
      borderRadius: "10px",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      fontWeight: "500",
    },
  }).showToast()
}

emailjs.init("YOUR_PUBLIC_KEY") // Replace with your EmailJS public key

const contactForm = document.getElementById("contact-form")
const formInputs = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
}

const formErrors = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
}

// Validation functions
function validateName(name) {
  return name.length >= 2
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateSubject(subject) {
  return subject.length >= 5
}

function validateMessage(message) {
  return message.length >= 10
}

// Real-time validation
Object.keys(formInputs).forEach((key) => {
  formInputs[key].addEventListener("blur", () => {
    validateField(key)
  })

  formInputs[key].addEventListener("input", () => {
    if (formErrors[key].textContent) {
      validateField(key)
    }
  })
})

function validateField(fieldName) {
  const value = formInputs[fieldName].value.trim()
  let isValid = false
  let errorMessage = ""

  switch (fieldName) {
    case "name":
      isValid = validateName(value)
      errorMessage = isValid ? "" : "Name must be at least 2 characters long"
      break
    case "email":
      isValid = validateEmail(value)
      errorMessage = isValid ? "" : "Please enter a valid email address"
      break
    case "subject":
      isValid = validateSubject(value)
      errorMessage = isValid ? "" : "Subject must be at least 5 characters long"
      break
    case "message":
      isValid = validateMessage(value)
      errorMessage = isValid ? "" : "Message must be at least 10 characters long"
      break
  }

  formErrors[fieldName].textContent = errorMessage
  formInputs[fieldName].style.borderColor = isValid ? "var(--accent-primary)" : "#ef4444"

  return isValid
}

// Enhanced form submission with EmailJS
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Validate all fields
  const validations = Object.keys(formInputs).map(validateField)
  const isFormValid = validations.every((isValid) => isValid)

  if (isFormValid) {
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const btnText = submitButton.querySelector(".btn-text")
    const btnLoader = submitButton.querySelector(".btn-loader")

    // Show loading state
    submitButton.classList.add("loading")
    submitButton.disabled = true

    try {
      // Send email using EmailJS (replace with your service ID and template ID)
      const templateParams = {
        from_name: formInputs.name.value,
        from_email: formInputs.email.value,
        subject: formInputs.subject.value,
        message: formInputs.message.value,
        to_email: "pathanlucky156@gmail.com",
      }

      // Simulate email sending (replace with actual EmailJS call)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

      showToast("Message sent successfully! I'll get back to you soon.", "success")
      contactForm.reset()

      // Reset field styles
      Object.keys(formInputs).forEach((key) => {
        formInputs[key].style.borderColor = "var(--border-color)"
      })
    } catch (error) {
      console.error("Error sending email:", error)
      showToast("Failed to send message. Please try again.", "error")
    } finally {
      // Reset button state
      submitButton.classList.remove("loading")
      submitButton.disabled = false
    }
  } else {
    showToast("Please fix the errors in the form", "error")
  }
})

const chatbotToggle = document.getElementById("chatbot-toggle")
const chatbotWindow = document.getElementById("chatbot-window")
const chatbotClose = document.getElementById("chatbot-close")
const chatbotInput = document.getElementById("chatbot-input")
const chatbotSend = document.getElementById("chatbot-send")
const chatbotMessages = document.getElementById("chatbot-messages")

const chatbotResponses = {
  hello: "Hi there! I'm Lakir's virtual assistant. How can I help you today?",
  hi: "Hello! Nice to meet you. What would you like to know about Lakir?",
  experience:
    "Lakir has experience as a Full Stack Developer at E-procurement Technology and currently works as a Software Engineering Intern at OTFCoder PVT LTD.",
  skills:
    "Lakir specializes in React.js, Node.js, Laravel, PHP, JavaScript, CSS, Bootstrap, Tailwind CSS, and various modern web technologies.",
  education:
    "Lakir is pursuing Bachelor of Engineering in Computer Science at LJIET with first-class distinction, achieving 7.78 SPI in 6th semester.",
  projects:
    "Lakir has worked on live projects including Bill Of Material (BOM), Asset Valuation, and Printing CRM with Full ERP system.",
  contact:
    "You can reach Lakir at pathanlucky156@gmail.com or +91 7578124510. Feel free to use the contact form below!",
  location: "Lakir is based in Ahmedabad, Gujarat, India.",
  default:
    "I'm here to help! You can ask me about Lakir's experience, skills, education, projects, or contact information.",
}

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("active")
  if (chatbotWindow.classList.contains("active")) {
    chatbotInput.focus()
  }
})

chatbotClose.addEventListener("click", () => {
  chatbotWindow.classList.remove("active")
})

function addMessage(message, isUser = false) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `chatbot-message ${isUser ? "user-message" : "bot-message"}`
  messageDiv.innerHTML = `<div class="message-content">${message}</div>`
  chatbotMessages.appendChild(messageDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  for (const [key, response] of Object.entries(chatbotResponses)) {
    if (message.includes(key)) {
      return response
    }
  }

  return chatbotResponses.default
}

function sendMessage() {
  const message = chatbotInput.value.trim()
  if (message) {
    addMessage(message, true)
    chatbotInput.value = ""

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message)
      addMessage(response)
    }, 1000)
  }
}

chatbotSend.addEventListener("click", sendMessage)
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
const scrollTopButton = document.createElement("button")
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollTopButton.className = "scroll-top-btn"
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
`

document.body.appendChild(scrollTopButton)

scrollTopButton.addEventListener("click", scrollToTop)

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopButton.style.opacity = "1"
    scrollTopButton.style.visibility = "visible"
  } else {
    scrollTopButton.style.opacity = "0"
    scrollTopButton.style.visibility = "hidden"
  }
})

// Add hover effect to scroll top button
scrollTopButton.addEventListener("mouseenter", () => {
  scrollTopButton.style.transform = "translateY(-3px)"
  scrollTopButton.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)"
})

scrollTopButton.addEventListener("mouseleave", () => {
  scrollTopButton.style.transform = "translateY(0)"
  scrollTopButton.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)"
})

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      // Start typing animation after loading
      if (textArray.length) setTimeout(type, newTextDelay + 250)
    }, 500)
  }, 3000)
}

// Observe elements
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(".reveal, .about-stats, .skills-content")
  elementsToObserve.forEach((element) => {
    observer.observe(element)
  })

  // Set initial active nav link
  updateActiveNavLink()

  // Hide loading screen
  hideLoadingScreen()

  // Show welcome toast
  setTimeout(() => {
    showToast("Welcome to Lakir's Portfolio! 👋", "info")
  }, 4000)
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    updateActiveNavLink()
    revealOnScroll()
  }, 16),
) // ~60fps

document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (!cursor) {
    const newCursor = document.createElement("div")
    newCursor.className = "custom-cursor"
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    `
    document.body.appendChild(newCursor)
  }

  const cursorElement = document.querySelector(".custom-cursor")
  cursorElement.style.left = e.clientX - 10 + "px"
  cursorElement.style.top = e.clientY - 10 + "px"
})

// Add hover effects for interactive elements
document.querySelectorAll("a, button, .project-card, .achievement-item").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const cursor = document.querySelector(".custom-cursor")
    if (cursor) {
      cursor.style.transform = "scale(1.5)"
      cursor.style.opacity = "0.8"
    }
  })

  element.addEventListener("mouseleave", () => {
    const cursor = document.querySelector(".custom-cursor")
    if (cursor) {
      cursor.style.transform = "scale(1)"
      cursor.style.opacity = "0.5"
    }
  })
})
