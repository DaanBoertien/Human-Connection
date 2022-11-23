// function myFunction(a) {
//     a.parentNode.getElementsByClassName('dropdown-content')[0].classList.toggle("show");
//   }

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");  
  navMenu.classList.toggle("open");
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 40,
  speed: 200,
  autoplay: true,


  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});