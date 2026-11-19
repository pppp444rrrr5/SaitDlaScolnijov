(() => {
  const picker = document.getElementById('backgroundPicker');
  const saved = localStorage.getItem('innerWorkingsBackground');
  if (saved) document.body.style.backgroundImage = `url("${saved}")`;
  if (!picker) return;
  picker.addEventListener('change', () => {
    const file = picker.files && picker.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      document.body.style.backgroundImage = `url("${data}")`;
      try { localStorage.setItem('innerWorkingsBackground', data); }
      catch (e) { alert('Изображение слишком большое для сохранения в браузере. Выбери файл меньшего размера.'); }
    };
    reader.readAsDataURL(file);
  });
})();
