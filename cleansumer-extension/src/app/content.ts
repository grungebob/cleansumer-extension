/* global chrome */
import { bCorp } from "../constants/bcorp";
import { normalizeHost } from "../constants/normalizeHost";



const runChecks = async () => {
    const host = window.location.host;
    const siteName = normalizeHost(host);
    const response = await bCorp(siteName);
    console.log('response', response);
};

runChecks();

chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'updatedTab') {
        runChecks();
    }
});

// Remove once proper imports/exports are created:
export {};