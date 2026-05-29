// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.querySelector("form").addEventListener("submit", function(e) {
  // e.preventDefault();
  alert("Thank you! Your message has been submitted.");
  // this.reset();
});


// ============================================
// CONTACT FORM HANDLER WITH EMAIL & WHATSAPP
// ============================================

const contactForm = document.getElementById("contactForm");
const nameField = document.getElementById("contactName");
const emailField = document.getElementById("contactEmail");
const messageField = document.getElementById("contactMessage");
const formStatus = document.getElementById("formStatus");
const emailBtn = document.getElementById("emailBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

// Form validation function
function validateForm() {
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  if (!name) {
    showStatus("Please enter your name.", "error");
    nameField.focus();
    return false;
  }

  if (!email || !isValidEmail(email)) {
    showStatus("Please enter a valid email address.", "error");
    emailField.focus();
    return false;
  }

  if (!message || message.length < 10) {
    showStatus("Please enter a message (at least 10 characters).", "error");
    messageField.focus();
    return false;
  }

  return true;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show status message
function showStatus(message, type = "info", duration = 4000) {
  formStatus.textContent = message;
  formStatus.className = `form-status active ${type}`;

  if (type !== "loading") {
    setTimeout(() => {
      formStatus.classList.remove("active");
    }, duration);
  }
}

// Clear status message
function clearStatus() {
  formStatus.classList.remove("active");
  formStatus.textContent = "";
}

// ============================================
// EMAIL BUTTON HANDLER
// ============================================
emailBtn.addEventListener("click", function(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  showStatus("Sending email...", "loading");
  
  const formData = new FormData(contactForm);
  
  // Submit to Web3Forms
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showStatus("✓ Email sent successfully! Thank you for reaching out.", "success", 5000);
      contactForm.reset();
      clearStatus();
      setTimeout(() => clearStatus(), 5000);
    } else {
      showStatus("✗ Error sending email. Please try again.", "error");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    showStatus("✗ Error sending email. Please try again or contact directly.", "error");
  });
});

// ============================================
// WHATSAPP BUTTON HANDLER
// ============================================
whatsappBtn.addEventListener("click", function(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();
  const phoneNumber = "917999452856"; // Replace with your WhatsApp number (country code + number, no + or spaces)

  // Format message for WhatsApp
  const whatsappMessage = `Hello! 🙏\n\nMy name: ${name}\nEmail: ${email}\n\nProject Details:\n${message}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Create WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Show status and open WhatsApp
  showStatus("Opening WhatsApp...", "loading");
  
  // Open WhatsApp Web or app
  window.open(whatsappLink, "_blank");

  // Show success message
  setTimeout(() => {
    showStatus("✓ WhatsApp link opened. Send the message in WhatsApp!", "success", 4000);
  }, 500);
});

// ============================================
// EXISTING FORM SUBMIT (WEB3FORMS)
// ============================================
contactForm.addEventListener("submit", function(e) {
  // Web3Forms handles submission, show success message after a short delay
  setTimeout(() => {
    showStatus("✓ Message received! Thank you for contacting me.", "success", 5000);
    contactForm.reset();
  }, 1000);
});

// Lightbox gallery functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxLabel = document.getElementById("lightboxLabel");
const lightboxCounter = document.getElementById("lightboxCounter");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentProjectGallery = [];
let currentImageIndex = 0;

// Collect all gallery items by project
const projectSections = document.querySelectorAll(".project-page");
const projectGalleries = [];

projectSections.forEach((section) => {
  const galleryItems = Array.from(section.querySelectorAll(".gallery-item"));
  if (galleryItems.length > 0) {
    projectGalleries.push(galleryItems);
  }
});

// Open lightbox when clicking gallery item
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Find which project this gallery item belongs to
    const projectSection = item.closest(".project-page");
    const galleryItems = Array.from(projectSection.querySelectorAll(".gallery-item"));
    
    currentProjectGallery = galleryItems;
    currentImageIndex = galleryItems.indexOf(item);
    
    displayLightboxContent();
    lightbox.classList.add("active");
  });
});

// Display lightbox content
function displayLightboxContent() {
  if (currentProjectGallery.length === 0) return;
  
  const item = currentProjectGallery[currentImageIndex];
  const img = item.querySelector("img");
  const label = item.dataset.label || "Project Image";
  
  if (img) {
    lightboxImage.src = img.src;
    lightboxImage.style.display = "block";
    lightboxVideo.style.display = "none";
  }
  
  lightboxLabel.textContent = label;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentProjectGallery.length}`;
  
  // Update button states
  prevBtn.disabled = currentImageIndex === 0;
  nextBtn.disabled = currentImageIndex === currentProjectGallery.length - 1;
}

// Navigate to next image
function showNextImage() {
  if (currentImageIndex < currentProjectGallery.length - 1) {
    currentImageIndex++;
    displayLightboxContent();
  }
}

// Navigate to previous image
function showPrevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    displayLightboxContent();
  }
}

// Event listeners for navigation
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

// Close lightbox
closeBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
  lightboxVideo.src = "";
}

// Close on overlay click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  
  switch (e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowRight":
      showNextImage();
      break;
    case "ArrowLeft":
      showPrevImage();
      break;
  }
});

// Mail to link handler
// document.querySelector("form").addEventListener("submit", function(e) {
  
//   alert("Thank you! Your message has been submitted.");
//   this.reset();
// });
