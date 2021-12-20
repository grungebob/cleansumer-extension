/* global chrome */

import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';


const App = () => {
    const [bcorp, setBcorpScore] = useState(null);
    const [host, setHost] = useState(null);

    const getStorage = () => chrome.storage.sync.get((storage) => {
        console.log(storage);
        if (storage.score && storage.host) {
            setBcorpScore(storage.score);
            setHost(storage.host);
        }
    });
    

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
                <div> Todo: [name here] </div>
                <div> B Corp Score: {bcorp} </div>
                <div> will erase: {host} </div>
            </div>
            )
            : (
            <div> 
                No ethics ratings found for {host}.
                <div>
                Todo: Button "Browse our Directory"
                Todo: Button "Submit a Rating"
                </div>
            </div>
            )
        }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));