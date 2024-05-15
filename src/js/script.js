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
        iconImageHref: "../img/map-location.svg",
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
burgerMenuButton.addEventListener("click", () => {
  menuList.classList.toggle("open");
  root.classList.toggle("no-scroll");
  burgerMenuButton.classList.toggle("active");
  if (window.innerWidth <= 768) {
    contactInfo.classList.toggle("open-contact");
  } else {
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuList.classList.remove("open");
    root.classList.remove("no-scroll");
    contactInfo.classList.remove("open-contact");
    burgerMenuButton.classList.remove("active");
  });
});

// Анимация картинки на главном экране
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  // resizeTo: window,
});

document.querySelector(".hero__pixi-container").appendChild(app.view);

// Загрузка текстур
const imgTexture = PIXI.Texture.from("../img/A-main.png");
const depthTexture = PIXI.Texture.from("../img/A-main-depth.png");

imgTexture.baseTexture.on("loaded", () => {
  depthTexture.baseTexture.on("loaded", () => {
    // Создание спрайта из основного изображения
    const img = new PIXI.Sprite(imgTexture);
    img.anchor.set(0.5);
    img.x = app.screen.width / 2;
    img.y = app.screen.height / 2;
    app.stage.addChild(img);

    // Создание спрайта для карты глубины
    const depthMap = new PIXI.Sprite(depthTexture);
    depthMap.anchor.set(0.05);
    // depthMap.x = app.screen.width / 2;
    // depthMap.y = app.screen.height / 2;
    app.stage.addChild(depthMap);

    // Создание фильтра смещения
    const displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
    // displacementFilter.autoFit = true;
    // displacementFilter.scale.set(50, 50); // начальная настройка масштаба
    img.filters = [displacementFilter];

    // Скрыть карту глубины
    // depthMap.visible = false;

    // Обработчик движения мыши
    window.onmousemove = function (e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = app.screen.width / 2;
      const centerY = app.screen.height / 2;

      const deltaX = centerX - mouseX;
      const deltaY = centerY - mouseY;

      displacementFilter.scale.x = deltaX / 20;
      displacementFilter.scale.y = deltaY / 20;
    };

    // Обработчик изменения размера окна
    window.addEventListener("resize", () => {
      // img.x = app.screen.width / 2;
      // img.y = app.screen.height / 2;
      // depthMap.x = app.screen.width / 2;
      // depthMap.y = app.screen.height / 2;
    });
  });
});
