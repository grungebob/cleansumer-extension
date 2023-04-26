import { bcorpOverall, bcorpProfile } from './constants/bcorp'

chrome.storage.sync.set({
    host: '',
    score: null,
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request.host) {
          const overallScore = await bcorpOverall(request.host);
          const profileLink = await bcorpProfile(request.host)
          console.log('background result overallScore: ', overallScore);
          if (overallScore){
              await chrome.storage.sync.set({
                  host: request.host,
                  score: overallScore?.data,
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