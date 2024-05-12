chrome.action.onClicked.addListener((tab) => {
  // Clear local storage and session storage
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      localStorage.clear();
      sessionStorage.clear();
    }
  });

  // Get current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = new URL(tabs[0].url);
    let domain = url.origin;

    // Clear cookies for the current tab's domain
    chrome.cookies.getAll({ url: domain }, function (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: domain + cookies[i].path,
          name: cookies[i].name,
          storeId: cookie.storeId
        });
      }
    });
  });
});
