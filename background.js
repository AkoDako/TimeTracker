/*Code property of Lanney Wang*/

chrome.tabs.onActivated.addListener( async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  //console.log(tab.title);
  console.log(tab[0].url);
  let url = new URL(tab[0].url);
  let domain = url.domain;
  console.log(domain);
  chrome.storage.sync.set({ "recentlyVisited": domain }, function() {});
  const d = new Date();
  let time = d.getTime();
  chrome.storage.sync.set({ "lastTime": time }, function() {});
  console.log(time);
  var last = "";
  chrome.alarms.create("1min", {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
  /*chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
    console.log(lastVisited.recentlyVisited);
  });*/
  
});

chrome.alarms.onAlarm.addListener(async function(alarm) {
  if (alarm.name === "1min") {
    let currentDomain;
    let tab = getCurrentTab();
    let url = new URL(tab[0].url);
    currentDomain = url.domain;
    let last;
    chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
      last = lastVisited;
      console.log(`last: ${last} current domain: ${currentDomain}`);
      if (last == currentDomain) {
        console.log("domains match");
      }
    });
  }
});

/*
first time: on activated?  something like that

switching tabs:

*/
/*
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};
*/
