const slider = document.getElementById('blurSlider');

const globalCheckbox = document.getElementById('globalCheckbox');
const domainSpecificCheckbox = document.getElementById('domainCheckbox');
const allDomainsDiv = document.getElementById('allDomainsDiv');
const domainLabel = document.getElementById('domain');

const toggleDomainSpecificCheckbox = () => {
  if (globalCheckbox.checked) {
    allDomainsDiv.style.display = 'none';
  } else {
    allDomainsDiv.style.display = 'initial';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        domainLabel.innerText = tabs[0].url ?? tabs[0].pendingUrl;
      } else {
        domainLabel.innerText = 'unknown';
      }
      domainLabel.innerText = domainLabel.innerText.split('/')[0];
    });
  }
};

globalCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ global: globalCheckbox.checked });
  toggleDomainSpecificCheckbox();
});

chrome.storage.local.get(['blur', 'global'], (result) => {
  slider.value = result.blur ?? 0;
  globalCheckbox.checked = result.global || result.global === undefined;
  toggleDomainSpecificCheckbox();
});

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  chrome.storage.local.set({ blur: value });
});
