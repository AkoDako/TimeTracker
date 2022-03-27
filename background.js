chrome.tabs.onActivated.addListener( async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  //console.log(tab.title);
  chrome.storage.sync.set({ "recentlyVisited": tab.title }, function() {

  });
  var last = "";
  chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
    last = lastVisited.recentlyVisited;
  })
  console.log(last);
});


async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/*chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
    console.log('amogus');
  }
  
});
*/
