let style = document.createElement('style');
document.head.appendChild(style);

style.sheet = style.sheet ?? new StyleSheet();
style.sheet.insertRule(`img { filter: blur(0) }`);
const rule = style.sheet.cssRules[style.sheet.cssRules.length - 1];

const domainName = window.location.host;

chrome.storage.local.get(['blur', domainName], (result) => {
  const value = result[domainName] ?? result.blur ?? 0;
  rule.style.filter = `blur(${value}px)`;
});

chrome.storage.onChanged.addListener((changes) => {
  if (domainName in changes && 'newValue' in changes[domainName]) {
    const newValue = changes[domainName].newValue;
    rule.style.filter = `blur(${newValue}px)`;
  } else if ('blur' in changes && 'newValue' in changes.blur) {
    chrome.storage.local.get([domainName], (result) => {
      if (!result[domainName]) {
        const newValue = changes['blur'].newValue;
        rule.style.filter = `blur(${newValue}px)`;
      }
    });
  }
});
