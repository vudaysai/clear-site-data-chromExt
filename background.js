chrome.browserAction.onClicked.addListener(function(tab) {
  // clears active tab localStorage and
  chrome.tabs.executeScript(tab.id, {
    code: "localStorage.clear(); sessionStorage.clear();"
  });

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    var url = new URL(tabs[0].url);
    var domain = url.origin;
    chrome.cookies.getAll({ url: domain }, function(cookies) {
      for (var i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: domain + cookies[i].path,
          name: cookies[i].name
        });
      }
    });
  });
});
