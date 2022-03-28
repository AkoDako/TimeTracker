/*Code property of Lanney Wang*/

chrome.tabs.onActivated.addListener( async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  //console.log(tab.title);
  let url = new URL(tab.url);
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
  chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
    console.log(lastVisited.recentlyVisited);
  });
  
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let currentTab = tab.title;

  }
  if (alarm.name === "1min") {
    let last = "";
    chrome.storage.sync.get( "recentlyVisited", function (lastVisited) {
      last = lastVisited;
      console.log(last);
      iif ()
    });
  }
});

/*
first time: on activated?  something like that

switching tabs:




*/
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

