const slider = document.getElementById('blurSlider');
const domainSlider = document.getElementById('domainBlurSlider');
const domainDiv = document.getElementById('domainSpecific');
const domainLabel = document.getElementById('domain');
const domainCheckbox = document.getElementById('domainCheckbox');

const setDomainDiv = () => {
  if (domainCheckbox.checked) {
    domainDiv.style.display = 'initial';
  } else {
    domainDiv.style.display = 'none';
  }
};

(async () => {
  // Get domain name, and populate domain label
  let domainName = null;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    domainName = tabs[0].url ?? tabs[0].pendingUrl;
    domainName = domainName.replace('https://', '').replace('http://', '').split('/')[0];
    domainLabel.innerText = domainName;
  }

  // Disable the checkbox if we can't get the name of the domain
  if (domainName === null) domainCheckbox.disabled = true;

  // On domain-specific checkbox change, show/hide the domain-specific slider and store/remove the domain-specific value
  domainCheckbox.addEventListener('change', () => {
    setDomainDiv();
    if (domainCheckbox.checked) {
      chrome.storage.local.set({ [domainName]: domainSlider.value });
    } else {
      chrome.storage.local.remove([domainName]);
    }
  });

  // On init, set global slider to value in storage or 0
  // + check domainCheckbox if needed, toggle domain slider, and set domain-specific slider value
  chrome.storage.local.get(['blur', domainName], (result) => {
    slider.value = result.blur ?? 0;
    if (result[domainName]) {
      domainCheckbox.checked = true;
      setDomainDiv();
      domainSlider.value = result[domainName];
    }
  });

  // On sliders change set the appropriate local storage values
  slider.addEventListener('input', (e) => {
    const value = e.target.value;
    chrome.storage.local.set({ blur: value });
  });

  domainSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    chrome.storage.local.set({ [domainName]: value });
  });
})();
