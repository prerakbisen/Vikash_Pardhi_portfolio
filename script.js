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

// Contact form handler
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! Your message has been submitted.");
  this.reset();
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
