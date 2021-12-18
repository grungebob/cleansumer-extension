import { bcorp } from './constants/bcorp'

chrome.storage.sync.set({
    host: '',
    score: null,
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request.host) {
          const result = await bcorp(request.host);
          console.log('background result: ', result);
          if (result){
              await chrome.storage.sync.set({
                  host: request.host,
                  score: result,
              })
          }
      }
  });