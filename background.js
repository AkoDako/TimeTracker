chrome.tabs.onActivated.addListener( function (tabId, windowId) {
  //if (changeInfo.status == 'complete') {
    console.log(tabId);
    console.log(windowId);
})


async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
