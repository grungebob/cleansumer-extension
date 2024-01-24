/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/background.ts":
/*!*******************************!*\
  !*** ./src/app/background.ts ***!
  \*******************************/
/***/ (function() {

/* global chrome */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const changeHostPrefix = (host) => {
    if (host.slice(0, 4) === 'www.')
        return host.slice(4);
    return `www.${host}`;
};
const bcorpOverall = (host, secondTime) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`, {
            method: 'GET'
        });
        // console.log('bcorpOverall response: ', response);
        if (!res && !secondTime) {
            // debugger;
            console.log('running bcorp overall second time');
            return bcorpOverall(changeHostPrefix(host), true);
        }
        return res;
    }
    catch (e) {
        console.error('bcorpOverall error: ', e);
        if (!secondTime) {
            console.log('RUNNING IT AGAIN BECAUSE OF ERROR');
            bcorpOverall(changeHostPrefix(host), true);
        }
    }
});
const bcorpProfile = (host, secondTime) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`, {
            method: 'GET'
        });
        console.log('bcorp profile res: ', res);
        const response = yield (res === null || res === void 0 ? void 0 : res.text());
        console.log('bcorpProfile response: ', response);
        if (!response && !secondTime) {
            // debugger;
            console.log('bcorpProfile RUN IT AGAIN');
            return bcorpProfile(changeHostPrefix(host), true);
        }
        return response;
    }
    catch (e) {
        console.log('bcorpProfile error: ', e);
        if (!secondTime) {
            bcorpProfile(changeHostPrefix(host), true);
        }
    }
});
chrome.storage.sync.set({
    host: '',
    score: null,
    loading: false,
});
/*
  Native Chrome pages such as newTab and extension will receive an error due to no content script
  returning from the sendMessage call. Therefore, we put this conditional to cover for this error.
  */
const tabReady = (tabs, listenerTabID) => __awaiter(this, void 0, void 0, function* () {
    const [activeTab] = yield chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    return activeTab.status === 'complete' && !activeTab.pendingUrl && !activeTab.url.startsWith('chrome://') && activeTab.id === listenerTabID;
});
// Sends a message to the current tab that the tab is updated and should run content script checks:
function updatedTab(tabId) {
    console.log('updated tab: ', tabId);
    try {
        chrome.tabs.sendMessage(tabId, {
            type: 'updatedTab',
        });
    }
    catch (e) {
        console.log('updated tab error: ', e);
    }
}
// Fires when the active tab in a window changes:
chrome.tabs.onActivated.addListener((activeInfo) => __awaiter(this, void 0, void 0, function* () {
    console.log('on activated: ', activeInfo);
    // const isTabReady = await tabReady(activeInfo, activeInfo.tabId);
    // if (isTabReady) {
    updatedTab(activeInfo.tabId);
    return true;
    // }
    // return true;
}));
// Fires when a tab is updated:
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => __awaiter(this, void 0, void 0, function* () {
    console.log('onupdated tabId, changeInfo, tab ', tabId, changeInfo, tab);
    // const isTabReady = await tabReady(tab, tabId);
    // if (isTabReady) {
    updatedTab(tabId);
    // }
    return true;
}));
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => __awaiter(this, void 0, void 0, function* () {
    // console.log('listener on message: ', request);
    if (request.host) {
        yield chrome.storage.sync.set({
            loading: true,
        });
        // console.log('request.host: ', request.host);
        const overallScore = yield bcorpOverall(request.host);
        const overallScoreJson = yield overallScore.json();
        const overallScoreRounded = Number.parseFloat(overallScoreJson).toFixed(2);
        if (overallScoreRounded) {
            yield chrome.storage.sync.set({
                host: request.host,
                score: overallScoreRounded,
                link: null,
                loading: false,
            });
        }
        const profileLink = yield bcorpProfile(request.host);
        // console.log('profile link? : ', profileLink);
        if (overallScore && profileLink) {
            yield chrome.storage.sync.set({
                link: profileLink,
            });
        }
        yield chrome.storage.sync.set({
            loading: false,
        });
    }
}));
// Right-Click Options:
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'ConsoleStorage',
        title: 'Console The Storage',
        contexts: ['all'],
    });
});
// Actions for Right-Click Options:
chrome.contextMenus.onClicked.addListener((query) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => __awaiter(this, void 0, void 0, function* () {
        if (query.menuItemId === 'ConsoleStorage') {
            chrome.storage.sync.get((result) => __awaiter(this, void 0, void 0, function* () {
                console.log('storage: ', result);
            }));
        }
    }));
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app/background.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FDTDtRQUNDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztLQUVKO0FBQ0wsQ0FBQyxFQUFDLENBQUM7QUFFTCx1QkFBdUI7QUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUN4QyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUN6QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEtBQUssRUFBRSxxQkFBcUI7UUFDNUIsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ2xCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsbUNBQW1DO0FBQ3JDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUN0RSxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssZ0JBQWdCLEVBQUU7WUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQU8sTUFBTSxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztVRTVKTDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vLi9zcmMvYXBwL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGVhbnN1bWVyLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBjaHJvbWUgKi9cblxuY29uc3QgY2hhbmdlSG9zdFByZWZpeCA9IChob3N0OiBzdHJpbmcpID0+IHtcbiAgaWYgKGhvc3Quc2xpY2UoMCwgNCkgPT09ICd3d3cuJykgcmV0dXJuIGhvc3Quc2xpY2UoNCk7XG4gIHJldHVybiBgd3d3LiR7aG9zdH1gO1xufVxuXG5jb25zdCBiY29ycE92ZXJhbGwgPSBhc3luYyAoaG9zdDogc3RyaW5nLCBzZWNvbmRUaW1lPzogYm9vbGVhbikgPT4ge1xuICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYml6ZGF0YWFwaS5henVyZXdlYnNpdGVzLm5ldC9CaXovR2V0T3ZlckFsbFNjb3JlP3dlYnNpdGU9JHtob3N0fWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ2Jjb3JwT3ZlcmFsbCByZXNwb25zZTogJywgcmVzcG9uc2UpO1xuICAgICAgaWYoIXJlcyAmJiAhc2Vjb25kVGltZSkge1xuICAgICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGJjb3JwIG92ZXJhbGwgc2Vjb25kIHRpbWUnKVxuICAgICAgICAgIHJldHVybiBiY29ycE92ZXJhbGwoY2hhbmdlSG9zdFByZWZpeChob3N0KSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdiY29ycE92ZXJhbGwgZXJyb3I6ICcsIGUpO1xuICAgICAgaWYoIXNlY29uZFRpbWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUlVOTklORyBJVCBBR0FJTiBCRUNBVVNFIE9GIEVSUk9SJylcbiAgICAgICAgICBiY29ycE92ZXJhbGwoY2hhbmdlSG9zdFByZWZpeChob3N0KSwgdHJ1ZSlcbiAgICAgIH1cbiAgfVxufVxuXG5jb25zdCBiY29ycFByb2ZpbGUgPSBhc3luYyAoaG9zdDogc3RyaW5nLCBzZWNvbmRUaW1lPzogYm9vbGVhbikgPT4ge1xuICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2ggKGBodHRwczovL2JpemRhdGFhcGkuYXp1cmV3ZWJzaXRlcy5uZXQvQml6L0dldEJjb3JwUHJvZmlsZT93ZWJzaXRlPSR7aG9zdH1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICB9XG4gICAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZygnYmNvcnAgcHJvZmlsZSByZXM6ICcsIHJlcyk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcz8udGV4dCgpO1xuICAgICAgY29uc29sZS5sb2coJ2Jjb3JwUHJvZmlsZSByZXNwb25zZTogJywgcmVzcG9uc2UpO1xuICAgICAgaWYoIXJlc3BvbnNlICYmICFzZWNvbmRUaW1lKSB7XG4gICAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Jjb3JwUHJvZmlsZSBSVU4gSVQgQUdBSU4nKTtcbiAgICAgICAgICByZXR1cm4gYmNvcnBQcm9maWxlKGNoYW5nZUhvc3RQcmVmaXgoaG9zdCksIHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnYmNvcnBQcm9maWxlIGVycm9yOiAnLCBlKTtcbiAgICAgIGlmKCFzZWNvbmRUaW1lKSB7XG4gICAgICAgICAgYmNvcnBQcm9maWxlKGNoYW5nZUhvc3RQcmVmaXgoaG9zdCksIHRydWUpXG4gICAgICB9XG4gIH1cbn1cblxuY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgIGhvc3Q6ICcnLFxuICAgIHNjb3JlOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICB9KTtcbiAgXG4gIC8qXG4gICAgTmF0aXZlIENocm9tZSBwYWdlcyBzdWNoIGFzIG5ld1RhYiBhbmQgZXh0ZW5zaW9uIHdpbGwgcmVjZWl2ZSBhbiBlcnJvciBkdWUgdG8gbm8gY29udGVudCBzY3JpcHRcbiAgICByZXR1cm5pbmcgZnJvbSB0aGUgc2VuZE1lc3NhZ2UgY2FsbC4gVGhlcmVmb3JlLCB3ZSBwdXQgdGhpcyBjb25kaXRpb25hbCB0byBjb3ZlciBmb3IgdGhpcyBlcnJvci5cbiAgICAqL1xuXG4gIGNvbnN0IHRhYlJlYWR5ID0gYXN5bmMgKHRhYnMsIGxpc3RlbmVyVGFiSUQpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiXSA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIGFjdGl2ZVRhYi5zdGF0dXMgPT09ICdjb21wbGV0ZScgJiYgIWFjdGl2ZVRhYi5wZW5kaW5nVXJsICYmICFhY3RpdmVUYWIudXJsLnN0YXJ0c1dpdGgoJ2Nocm9tZTovLycpICYmIGFjdGl2ZVRhYi5pZCA9PT0gbGlzdGVuZXJUYWJJRDtcbiAgfTtcbiAgXG4gIC8vIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgY3VycmVudCB0YWIgdGhhdCB0aGUgdGFiIGlzIHVwZGF0ZWQgYW5kIHNob3VsZCBydW4gY29udGVudCBzY3JpcHQgY2hlY2tzOlxuICBmdW5jdGlvbiB1cGRhdGVkVGFiKHRhYklkKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdGFiOiAnLCB0YWJJZCk7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7XG4gICAgICAgIHR5cGU6ICd1cGRhdGVkVGFiJyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHRhYiBlcnJvcjogJywgZSk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBGaXJlcyB3aGVuIHRoZSBhY3RpdmUgdGFiIGluIGEgd2luZG93IGNoYW5nZXM6XG4gIGNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGFzeW5jIChhY3RpdmVJbmZvKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29uIGFjdGl2YXRlZDogJywgYWN0aXZlSW5mbylcbiAgICAvLyBjb25zdCBpc1RhYlJlYWR5ID0gYXdhaXQgdGFiUmVhZHkoYWN0aXZlSW5mbywgYWN0aXZlSW5mby50YWJJZCk7XG4gICAgLy8gaWYgKGlzVGFiUmVhZHkpIHtcbiAgICAgIHVwZGF0ZWRUYWIoYWN0aXZlSW5mby50YWJJZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG4gICAgLy8gcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIC8vIEZpcmVzIHdoZW4gYSB0YWIgaXMgdXBkYXRlZDpcbiAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGFzeW5jICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29udXBkYXRlZCB0YWJJZCwgY2hhbmdlSW5mbywgdGFiICcsIHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpO1xuICAgIC8vIGNvbnN0IGlzVGFiUmVhZHkgPSBhd2FpdCB0YWJSZWFkeSh0YWIsIHRhYklkKTtcbiAgXG4gICAgLy8gaWYgKGlzVGFiUmVhZHkpIHtcbiAgICAgIHVwZGF0ZWRUYWIodGFiSWQpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2xpc3RlbmVyIG9uIG1lc3NhZ2U6ICcsIHJlcXVlc3QpO1xuICAgICAgaWYgKHJlcXVlc3QuaG9zdCkge1xuICAgICAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXF1ZXN0Lmhvc3Q6ICcsIHJlcXVlc3QuaG9zdCk7XG4gICAgICAgICAgY29uc3Qgb3ZlcmFsbFNjb3JlID0gYXdhaXQgYmNvcnBPdmVyYWxsKHJlcXVlc3QuaG9zdCk7XG4gICAgICAgICAgY29uc3Qgb3ZlcmFsbFNjb3JlSnNvbiA9IGF3YWl0IG92ZXJhbGxTY29yZS5qc29uKCk7XG4gICAgICAgICAgY29uc3Qgb3ZlcmFsbFNjb3JlUm91bmRlZCA9IE51bWJlci5wYXJzZUZsb2F0KG92ZXJhbGxTY29yZUpzb24pLnRvRml4ZWQoMik7XG4gICAgICAgICAgaWYgKG92ZXJhbGxTY29yZVJvdW5kZWQpe1xuICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICAgICAgICBob3N0OiByZXF1ZXN0Lmhvc3QsXG4gICAgICAgICAgICAgICAgICBzY29yZTogb3ZlcmFsbFNjb3JlUm91bmRlZCxcbiAgICAgICAgICAgICAgICAgIGxpbms6IG51bGwsXG4gICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcHJvZmlsZUxpbmsgPSBhd2FpdCBiY29ycFByb2ZpbGUocmVxdWVzdC5ob3N0KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncHJvZmlsZSBsaW5rPyA6ICcsIHByb2ZpbGVMaW5rKTtcbiAgICAgICAgICBpZiAob3ZlcmFsbFNjb3JlICYmIHByb2ZpbGVMaW5rKXtcbiAgICAgICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICBsaW5rOiBwcm9maWxlTGluayxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICB9XG4gIH0pO1xuXG4vLyBSaWdodC1DbGljayBPcHRpb25zOlxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgIGlkOiAnQ29uc29sZVN0b3JhZ2UnLFxuICAgICAgdGl0bGU6ICdDb25zb2xlIFRoZSBTdG9yYWdlJyxcbiAgICAgIGNvbnRleHRzOiBbJ2FsbCddLFxuICAgIH0pO1xuICB9KTtcblxuICAvLyBBY3Rpb25zIGZvciBSaWdodC1DbGljayBPcHRpb25zOlxuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKHF1ZXJ5KSA9PiB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgYXN5bmMgKHRhYnMpID0+IHtcbiAgICAgIGlmIChxdWVyeS5tZW51SXRlbUlkID09PSAnQ29uc29sZVN0b3JhZ2UnKSB7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmFnZTogJywgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9hcHAvYmFja2dyb3VuZC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9