const burgerMenuButton = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
const menuList = document.querySelector(".menu__list");
const contactInfo = document.querySelector(".contact-info");
//
burgerMenuButton.addEventListener("click", () => {
  menuList.classList.toggle("open");

  if (window.innerWidth <= 768) {
    contactInfo.classList.toggle("open-contact");
  } else {
  }
});

//
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  // resizeTo: window,
});
// document.body.appendChild(app.view);
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
