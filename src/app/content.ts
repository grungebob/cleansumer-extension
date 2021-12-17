/* global chrome */

const checkUrl = (site) => window.location.href.indexOf(site) !== -1;

const runChecks = async () => {
    console.log('run checks');
};

runChecks();

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'updatedTab'){
        runChecks();
    }
});