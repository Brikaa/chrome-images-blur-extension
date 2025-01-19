chrome.storage.onChanged.addListener((changes) => {
  if ('blur' in changes) {
    console.log(changes['blur'].newValue);
  }
});
