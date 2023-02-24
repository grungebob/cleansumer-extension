/* global chrome */

import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';


const App = () => {
    const [score, setScore] = useState(null);
    const [host, setHost] = useState(null);
    const [profile, setProfile] = useState(null);


    const getStorage = () => chrome.storage.sync.get((storage) => {
        console.log(storage);
        if (storage.score && storage.host) {
            setScore(storage.score);
            setHost(storage.host);
            setProfile(storage.link)
        }
    });

    const bCorpProfileLink = profile ? `https://www.bcorporation.net/en-us/find-a-b-corp/company/${profile?.split('directory/')[1]}` : null
    

  useEffect(() => {
      console.log('getting storage');
    getStorage();
    // chrome.runtime.sendMessage({ insert message here });
  }, []);

  /* Listener for page change */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('request: ', request)
    getStorage();
  });

  return (
    <div>
        {host ?
            (
            <div>
                <div> scores: {score} </div>
                <div> site: {host} </div>
                <a href={bCorpProfileLink} target="_blank" rel="noreferrer">B Corp Profile</a>
            </div>
            )
            : (
            <div> 
                No Ethics Scores Found for this site
            </div>
            )
        }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));