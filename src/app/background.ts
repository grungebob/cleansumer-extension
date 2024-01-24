/* global chrome */

const changeHostPrefix = (host: string) => {
  if (host.slice(0, 4) === 'www.') return host.slice(4);
  return `www.${host}`;
}

const bcorpOverall = async (host: string, secondTime?: boolean) => {
  try {
      const res = await fetch(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`,
      {
        method: 'GET'
      });
      // console.log('bcorpOverall response: ', response);
      if(!res && !secondTime) {
          // debugger;
          console.log('running bcorp overall second time')
          return bcorpOverall(changeHostPrefix(host), true);
      }
      return res;
  } catch (e) {
      console.error('bcorpOverall error: ', e);
      if(!secondTime) {
          console.log('RUNNING IT AGAIN BECAUSE OF ERROR')
          bcorpOverall(changeHostPrefix(host), true)
      }
  }
}

const bcorpProfile = async (host: string, secondTime?: boolean) => {
  try {
      const res = await fetch (`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`,
      {
        method: 'GET'
      }
        );
      console.log('bcorp profile res: ', res);
      const response = await res?.text();
      console.log('bcorpProfile response: ', response);
      if(!response && !secondTime) {
          // debugger;
          console.log('bcorpProfile RUN IT AGAIN');
          return bcorpProfile(changeHostPrefix(host), true);
      }
      return response;
  } catch (e) {
      console.log('bcorpProfile error: ', e);
      if(!secondTime) {
          bcorpProfile(changeHostPrefix(host), true)
      }
  }
}

chrome.storage.sync.set({
    host: '',
    score: null,
    loading: false,
  });
  
  /*
    Native Chrome pages such as newTab and extension will receive an error due to no content script
    returning from the sendMessage call. Therefore, we put this conditional to cover for this error.
    */

  const tabReady = async (tabs, listenerTabID) => {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return activeTab.status === 'complete' && !activeTab.pendingUrl && !activeTab.url.startsWith('chrome://') && activeTab.id === listenerTabID;
  };
  
  // Sends a message to the current tab that the tab is updated and should run content script checks:
  function updatedTab(tabId) {
    console.log('updated tab: ', tabId);
    try {
      chrome.tabs.sendMessage(tabId, {
        type: 'updatedTab',
      });
    } catch (e) {
      console.log('updated tab error: ', e);
    }
  }
  
  // Fires when the active tab in a window changes:
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    console.log('on activated: ', activeInfo)
    // const isTabReady = await tabReady(activeInfo, activeInfo.tabId);
    // if (isTabReady) {
      updatedTab(activeInfo.tabId);
      return true;
    // }
    // return true;
  });

  // Fires when a tab is updated:
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('onupdated tabId, changeInfo, tab ', tabId, changeInfo, tab);
    // const isTabReady = await tabReady(tab, tabId);
  
    // if (isTabReady) {
      updatedTab(tabId);
    // }
    return true;
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      // console.log('listener on message: ', request);
      if (request.host) {
            await chrome.storage.sync.set({
              loading: true,
          });
          // console.log('request.host: ', request.host);
          const overallScore = await bcorpOverall(request.host);
          const overallScoreJson = await overallScore.json();
          const overallScoreRounded = Number.parseFloat(overallScoreJson).toFixed(2);
          if (overallScoreRounded){
              await chrome.storage.sync.set({
                  host: request.host,
                  score: overallScoreRounded,
                  link: null,
                  loading: false,
              })
          }
          const profileLink = await bcorpProfile(request.host);
          // console.log('profile link? : ', profileLink);
          if (overallScore && profileLink){
            await chrome.storage.sync.set({
                link: profileLink,
            })
        }
          await chrome.storage.sync.set({
            loading: false,
        });
          
      }
  });

// Right-Click Options:
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'ConsoleStorage',
      title: 'Console The Storage',
      contexts: ['all'],
    });
  });

  // Actions for Right-Click Options:
chrome.contextMenus.onClicked.addListener((query) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (query.menuItemId === 'ConsoleStorage') {
        chrome.storage.sync.get(async (result) => {
          console.log('storage: ', result);
        });
      }
    });
  });
