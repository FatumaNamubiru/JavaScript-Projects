const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.getElementById("lightboxClose");
const previousButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[currentIndex];
  const thumbnail = item.querySelector("img");

  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = thumbnail.alt;
  lightboxCaption.textContent = item.dataset.caption;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  galleryItems[currentIndex].focus();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showImage(currentIndex - 1));
nextButton.addEventListener("click", () => showImage(currentIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showImage(currentIndex - 1);
  } else if (event.key === "ArrowRight") {
    showImage(currentIndex + 1);
  }
});
