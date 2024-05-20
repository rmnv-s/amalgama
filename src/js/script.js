document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);

  function init() {
    // Создание карты.
    let myMap = new ymaps.Map("map", {
      center: [55.725899, 37.524776],
      zoom: 15,
      controls: [],
      suppressMapOpenBlock: true,
    });
    myMap.container.getElement().style.filter = "grayscale(100%)";

    // Добавление метки на карту.
    let myPlacemark = new ymaps.Placemark(
      [55.727339, 37.532286],
      {},
      {
        // Настройки иконки метки
        iconLayout: "default#image",
        iconImageHref: "/img/map-location.svg",
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});

//
const root = document.querySelector(".root");
const burgerMenuButton = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
const menuList = document.querySelector(".menu__list");
const contactInfo = document.querySelector(".contact-info");
const menuLinks = document.querySelectorAll(".menu__list-link");
//
// burgerMenuButton.addEventListener("click", () => {
//   menuList.classList.toggle("open");
//   root.classList.toggle("no-scroll");
//   burgerMenuButton.classList.toggle("active");
//   if (window.innerWidth <= 768) {
//     contactInfo.classList.toggle("open-contact");
//   } else {
//   }
// });
//
// menuLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     menuList.classList.remove("open");
//     root.classList.remove("no-scroll");
//     contactInfo.classList.remove("open-contact");
//     burgerMenuButton.classList.remove("active");
//   });
// });

burgerMenuButton.addEventListener("click", () => {
  menuList.classList.toggle("open");
  root.classList.toggle("no-scroll");
  burgerMenuButton.classList.toggle("active");
  if (window.innerWidth <= 768) {
    contactInfo.classList.toggle("open-contact");
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent default link action
    event.preventDefault();

    // Get the target anchor
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Close the menu
    menuList.classList.remove("open");
    root.classList.remove("no-scroll");
    contactInfo.classList.remove("open-contact");
    burgerMenuButton.classList.remove("active");

    // Delay scrolling to allow menu to close properly
    setTimeout(() => {
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      // Update the URL hash without jumping
      history.pushState(null, null, targetId);
    }, 300); // Adjust delay as needed
  });
});

// document.addEventListener("DOMContentLoaded", function () {
const listItems = document.querySelectorAll(".card__list-item");

listItems.forEach(function (item) {
  item.addEventListener("click", function () {
    let slideIndex = parseInt(this.getAttribute("data-slide-index"));
    let parentBlock = this.closest(".products__inner");

    let lists = parentBlock.querySelectorAll(".card__list");
    let sliders = parentBlock.querySelectorAll(".products__slider");

    lists.forEach(function (list) {
      list.querySelectorAll(".card__list-item").forEach(function (listItem) {
        listItem.classList.remove("active-slider");
      });
    });

    sliders.forEach(function (slider) {
      slider.querySelectorAll("img").forEach(function (img) {
        img.classList.remove("active-slider");
      });
    });

    this.classList.add("active-slider");

    let images = parentBlock.querySelectorAll(".products__slider img");

    // Показываем только выбранное изображение текущего блока
    images[slideIndex].classList.add("active-slider");
  });
});
// });
