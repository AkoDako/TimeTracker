/*Code property of Lanney Wang*/

chrome.tabs.onActivated.addListener( function(activeInfo) {
  //let queryOptions = { active: true, lastFocusedWindow: true };
  let url = new URL('https://www.google.com');
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    url = new URL(tabs[0].url);
    console.log(url.hostname);
    chrome.storage.sync.set({ "recentlyVisited": url.hostname }, function() {});
  });
  
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
    //let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      let url = new URL(tabs[0].url);
      console.log(url.hostname);
      let currentDomain = url.hostname;
      chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
      console.log(`last: ${lastVisited.recentlyVisited} current domain: ${currentDomain}`);
      if (lastVisited.recentlyVisited == currentDomain) {
        console.log("domains match");
      }
    });
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
