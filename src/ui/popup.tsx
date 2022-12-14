/* global chrome */

import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';


const App = () => {
    const [score, setScore] = useState(null);
    const [host, setHost] = useState(null);
    const [link, setLink] = useState(null);

    const getStorage = () => chrome.storage.sync.get((storage) => {
        console.log('storage: ', storage);
        if (storage.score && storage.host) {
            setScore(storage.score);
            setHost(storage.host);
        }
        if (storage.link) {
          setLink(storage.link);
        }
    });
    

  useEffect(() => {
      console.log('getting storage');
    getStorage();
    // chrome.runtime.sendMessage({ insert message here });
  }, []);

  useEffect(() => {
    console.log('score, host link: ', score, host, link);
  // chrome.runtime.sendMessage({ insert message here });
}, [score, host, link]);

  /* Listener for page change */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('request: ', request)
    getStorage();
  });

  const linkSplit = link?.split('/');
  const linkParse = linkSplit ? linkSplit[linkSplit.length - 1] : null;

  return (
    <div>
        {host ?
            (
            <div>
                <div> scores: {score} </div>
                <div> site: {host} </div>
                {link ? <a href={`https://www.bcorporation.net/en-us/find-a-b-corp/company/${linkParse}`} target="_blank">Link to B Corp Profiole</a> : null}
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