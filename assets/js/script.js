'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "todos") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// technologies carousel variables
const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselPrevBtn = document.querySelector("[data-carousel-prev]");
const carouselNextBtn = document.querySelector("[data-carousel-next]");

if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
  const techItems = document.querySelectorAll(".tech-item");
  const itemWidth = 110; // 80px width + 30px gap
  let currentPosition = 0;
  const itemsToScroll = 3;

  // Calculate max position to ensure all items can be viewed
  const getMaxPosition = () => {
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const totalWidth = techItems.length * itemWidth;
    // Calculate how much we need to scroll to show all items
    const maxScroll = totalWidth - containerWidth + 30; // Add padding for last items
    return Math.max(0, maxScroll);
  };

  // Update carousel position
  const updateCarousel = () => {
    carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
    
    // Update button states
    carouselPrevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
    carouselPrevBtn.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
    
    const maxPosition = getMaxPosition();
    carouselNextBtn.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
    carouselNextBtn.style.cursor = currentPosition >= maxPosition ? 'default' : 'pointer';
  };

  // Next button
  carouselNextBtn.addEventListener("click", function () {
    const maxPosition = getMaxPosition();
    if (currentPosition < maxPosition) {
      currentPosition = Math.min(currentPosition + (itemWidth * itemsToScroll), maxPosition);
      updateCarousel();
    }
  });

  // Previous button
  carouselPrevBtn.addEventListener("click", function () {
    if (currentPosition > 0) {
      currentPosition = Math.max(currentPosition - (itemWidth * itemsToScroll), 0);
      updateCarousel();
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    const maxPosition = getMaxPosition();
    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
      updateCarousel();
    }
  });

  // Initial update
  updateCarousel();

  // Auto-scroll functionality (optional)
  let autoScrollInterval;
  
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      const maxPosition = getMaxPosition();
      if (currentPosition >= maxPosition) {
        currentPosition = 0;
      } else {
        currentPosition = Math.min(currentPosition + itemWidth, maxPosition);
      }
      updateCarousel();
    }, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  // Start auto-scroll
  startAutoScroll();

  // Pause auto-scroll on hover
  carouselTrack.parentElement.parentElement.addEventListener("mouseenter", stopAutoScroll);
  carouselTrack.parentElement.parentElement.addEventListener("mouseleave", startAutoScroll);
}