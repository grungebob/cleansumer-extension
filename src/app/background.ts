import { bcorp } from './constants/bcorp';
import { tempLookup } from './constants/tempLookup';

chrome.storage.sync.set({
    host: '',
    score: null,
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request.host) {
            console.log('request: host: ', request.host);
          const tempScore = tempLookup(request.host);
          console.log('tempScore: ', tempScore);
          const result = await bcorp(request.host);
          console.log('background result: ', result);
          if (tempScore || result?.data){
              await chrome.storage.sync.set({
                  host: request.host,
                  score: result?.data ? result?.data : tempScore?.overall_score,
                  link: tempScore?.b_corp_profile ?? null,
              })
          }
      }
  });