/* ============================================================
  ★★★ ЗДЕСЬ МЕНЯЕТСЯ ГЛАВНАЯ ТЕМА САЙТА ★★★
  Измените значения в объекте THEME ниже — заголовок, подзаголовок,
  цитата, вывод и название вкладки на ГЛАВНОЙ странице обновятся сами.
  Аргументы «Почему эта история про это» (страница 1, id="proof") и
  страница 3 (id="jobs") написаны под текущую тему — при смене темы
  перепишите и их.
  ============================================================ */
const THEME = {
  title:    "Работа, которую кто-то должен делать",   // ← главная тема
  subtitle: "Короткометражка Pixar про облако Гаса и аиста Пека, который доставляет опасных малышей.", // ← подзаголовок
  quote:    "Часть работы опасна и тяжела, но без неё малыши не будут доставлены.",  // ← цитата
  conclusion:"В мультфильме работа Пека необходима, опасна и всё равно выполняется: он использует защиту и продолжает доставку." // ← вывод
};

// Подставляет THEME в элементы с атрибутом data-theme (менять не нужно — см. блок ★ выше).
document.querySelectorAll("[data-theme]").forEach(function(el){
  var v = THEME[el.getAttribute("data-theme")];
  if (v) el.textContent = v;
});
// Название вкладки главной страницы берётся из THEME.title
if (document.body.dataset.page === "index") {
  document.title = "Partly Cloudy — " + THEME.title;
}

// Плавный переход между страницами.
// Если браузер умеет межстраничные переходы (CSS @view-transition) — они включатся сами.
// Иначе (или при открытии файла прямо с диска) — запасной вариант: затухание и появление.
var nativeFade = window.PageSwapEvent && location.protocol !== "file:";
if (!nativeFade) {
  document.body.classList.add("fade-in");
  document.querySelectorAll("nav a, a.next").forEach(function(a){
    a.addEventListener("click", function(e){
      var href = a.getAttribute("href");
      if (!href || e.ctrlKey || e.metaKey || e.shiftKey || a.classList.contains("on")) return;
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(function(){ location.href = href; }, 450);
    });
  });
  window.addEventListener("pageshow", function(e){
    if (e.persisted) document.body.classList.remove("leaving");
  });
}
