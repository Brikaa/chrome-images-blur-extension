let style = document.createElement('style');
document.head.appendChild(style);

style.sheet = style.sheet ?? new StyleSheet();
style.sheet.insertRule(`img { filter: blur(0) }`);
const rule = style.sheet.cssRules[style.sheet.cssRules.length - 1];

chrome.storage.local.get('blur', (result) => {
  rule.style.filter = `blur(${result.blur}px)`;
});

chrome.storage.onChanged.addListener((changes) => {
  if ('blur' in changes) {
    const newValue = changes['blur'].newValue;
    rule.style.filter = `blur(${newValue}px)`;
  }
});
