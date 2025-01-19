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

let rule = null;
if (ruleIndex === -1) {
  sheet.insertRule(`img { filter: blur(0); }`, sheet.cssRules.length);
  rule = sheet.cssRules[sheet.cssRules.length - 1];
} else {
  rule = sheet.cssRules[ruleIndex];
}

chrome.storage.onChanged.addListener((changes) => {
  if ('blur' in changes) {
    const newValue = changes['blur'].newValue;
    rule.style.filter = `blur(${newValue}px)`;
  }
});
