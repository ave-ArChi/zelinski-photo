
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");
  const images = Array.from(document.querySelectorAll(".lightbox-trigger"));

  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      lightboxImage.src = images[index].src;
      currentIndex = index;
    }
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      showImage(index);
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    showImage((currentIndex + 1) % images.length);
  });

  prevBtn.addEventListener("click", () => {
    showImage((currentIndex - 1 + images.length) % images.length);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        showImage((currentIndex + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        showImage((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });
});
