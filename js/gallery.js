let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Auto slideshow
let autoSlide = setInterval(function() {
  plusSlides(1);
}, 5000); // Change image every 5 seconds

// Pause slideshow when user interacts with controls
document.querySelector('.slideshow-container').addEventListener('mouseenter', function() {
  clearInterval(autoSlide);
});

// Resume slideshow when user stops interacting
document.querySelector('.slideshow-container').addEventListener('mouseleave', function() {
  autoSlide = setInterval(function() {
    plusSlides(1);
  }, 5000);
});