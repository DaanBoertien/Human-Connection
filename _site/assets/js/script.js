// function myFunction(a) {
//     a.parentNode.getElementsByClassName('dropdown-content')[0].classList.toggle("show");
//   }

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu")
const navUl = document.querySelector(".submenu-mobile-toggle ")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");  
  navMenu.classList.toggle("open");
});

navUl.addEventListener("click", () => {
  navUl.classList.toggle("open");
} )

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

gsap.registerPlugin(ScrollTrigger);
gsap.to('.button-omhoog-link', { autoAlpha: 1, y: 0,
  scrollTrigger: {
      trigger: '.landing-content',
      start: 'top top+=100',
      toggleActions: 'play none none reverse',
      markers: false
  }
});