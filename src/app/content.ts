/* global chrome */

const normalizeHost = (host: string) => {
    if (host.indexOf('www.') !== -1 && host.indexOf('https://') !== -1) {
      return host.slice(12).replace(/ /g, '');
    }
    if (host.indexOf('www.') !== -1) {
      return host.slice(4).replace(/ /g, '');
    }
    return host.replace(/ /g, '');
  };

const checkSite = async () => {
    const host = window.location.host;
    console.log('host: ', host);
    const normalized = normalizeHost(host);
    console.log('normalized: ', normalized);
    chrome.runtime.sendMessage({
        host: normalized,
      });
};

checkSite();

chrome.runtime.onMessage.addListener((request) => {
    console.log('request: ', request.type);
    if (request.type === 'updatedTab'){
        checkSite();
    }
});