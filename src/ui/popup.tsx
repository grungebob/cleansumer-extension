/* global chrome */

import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';


const App = () => {
  const getStorage = () => chrome.storage.sync.get((storage) => {
    console.log(storage)
  });

  useEffect(() => {
    // getStorage();
    // chrome.runtime.sendMessage({ insert message here });
  }, []);

  /* Listener for page change */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('request: ', request)
    getStorage();
  });



  return (
    <div>
      result: 
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));