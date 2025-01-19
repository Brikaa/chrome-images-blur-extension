chrome.storage.onChanged.addListener((changes) => {
  if ('blur' in changes) {
    const newValue = changes['blur'].newValue;
    let style = document.querySelector('style');

    if (!style) {
      style = document.createElement('style');
      document.head.appendChild(style);
    }

    const sheet = style.sheet;

    let ruleIndex = -1;
    for (let i = 0; i < sheet.cssRules.length; i++) {
      if (sheet.cssRules[i].selectorText === 'img') {
        ruleIndex = i;
        break;
      }
    }

    if (ruleIndex !== -1) {
      sheet.cssRules[ruleIndex].style.filter = `blur(${newValue}px)`;
    } else {
      sheet.insertRule(`img { filter: blur(${newValue}px); }`, sheet.cssRules.length);
    }
  }
});
