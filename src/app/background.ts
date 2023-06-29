import { bcorpOverall, bcorpProfile } from './constants/bcorp'

chrome.storage.sync.set({
    host: '',
    score: null,
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
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