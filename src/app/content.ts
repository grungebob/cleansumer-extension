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
    const normalized = normalizeHost(host);
    console.log('host: ', normalized);
    chrome.runtime.sendMessage({
        host: host,
      });
};

checkSite();

chrome.runtime.onMessage.addListener((request) => {
    console.log('request: ', request.type);
    if (request.type === 'updatedTab'){
        checkSite();
    }
});