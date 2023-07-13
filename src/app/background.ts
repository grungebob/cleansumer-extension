import { bcorpOverall, bcorpProfile } from './constants/bcorp'

chrome.storage.sync.set({
    host: '',
    score: null,
  });
  
  /*
    Native Chrome pages such as newTab and extension will receive an error due to no content script
    returning from the sendMessage call. Therefore, we put this conditional to cover for this error.
    */
  // const tabReady = async (tabs, listenerTabID) => {
  //   const [activeTab] = await chrome.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   });
  //   return activeTab.status === 'complete' && !activeTab.pendingUrl && !activeTab.url.startsWith('chrome://') && activeTab.id === listenerTabID;
  // };
  
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
      console.log('listener on message: ', request);
      if (request.host) {
          const overallScore = await bcorpOverall(request.host);
          const overallScoreRounded = Number.parseFloat(overallScore?.data).toFixed(2);
          const profileLink = await bcorpProfile(request.host);
          if (overallScore){
              await chrome.storage.sync.set({
                  host: request.host,
                  score: overallScoreRounded,
                  link: profileLink?.data,
              })
          }
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