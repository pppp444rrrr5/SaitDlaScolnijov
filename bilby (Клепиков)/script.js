(() => {
  const sections = [...document.querySelectorAll("[data-scene]")];
  const header = document.querySelector(".site-header");
  if (!sections.length) return;

  // Определяем текущий участок по позиции прокрутки. Переходы между сценами
  // выполняются CSS-переходом прозрачности, поэтому фон не мигает.
  let ticking = false;
  const update = () => {
    const marker = window.innerHeight * 0.48;
    let current = sections[0];
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker) current = section;
      else break;
    }
    document.body.classList.remove("scene-desert", "scene-jungle", "scene-coast");
    document.body.classList.add(`scene-${current.dataset.scene || "desert"}`);
    if (header) header.classList.toggle("scrolled", window.scrollY > 35);
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
