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
                  score: overallScore.data,
                  link: profileLink?.data,
              })
          }
      }
  });