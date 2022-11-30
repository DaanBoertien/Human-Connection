// function myFunction(a) {
//     a.parentNode.getElementsByClassName('dropdown-content')[0].classList.toggle("show");
//   }

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu")
const navUl1 = document.querySelector(".submenu-mobile-toggle1 ")
const navUl2 = document.querySelector(".submenu-mobile-toggle2 ")
const navUl3 = document.querySelector(".submenu-mobile-toggle3 ")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");  
  navMenu.classList.toggle("open");
})

navUl1.addEventListener("click", () => {
  navUl1.classList.toggle("open");
} )

navUl2.addEventListener("click", () => {
  navUl2.classList.toggle("open");
} )

navUl3.addEventListener("click", () => {
  navUl3.classList.toggle("open");
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

  breakpoints: {

    // when window width is >= 480px
    480: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 7,
      spaceBetween: 40
    }
  },


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

gsap.to('.mainlogo', {maxWidth: 100, paddingBottom: 0, paddingTop: 0,
  scrollTrigger: {
    trigger: '.vision',
    start: 'top-=100',
    end: '+=500',
    toggleActions: 'play none none reverse',
    markers: false,
    // ease: "power1.inOut",
    duration: 0.5
  }});