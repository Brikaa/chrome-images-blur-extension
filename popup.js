const slider = document.getElementById('blurSlider');

chrome.storage.local.get('blur', (result) => {
  slider.value = result.blur ?? 0;
});

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  chrome.storage.local.set({ blur: value });
});
