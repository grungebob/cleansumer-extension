/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/background.ts":
/*!*******************************!*\
  !*** ./src/app/background.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
console.log('thest');
const bcorp_1 = __webpack_require__(/*! ./constants/bcorp */ "./src/app/constants/bcorp.ts");
chrome.storage.sync.set({
    host: '',
    score: null,
    loading: false,
});
/*
  Native Chrome pages such as newTab and extension will receive an error due to no content script
  returning from the sendMessage call. Therefore, we put this conditional to cover for this error.
  */
const tabReady = (tabs, listenerTabID) => __awaiter(void 0, void 0, void 0, function* () {
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
chrome.tabs.onActivated.addListener((activeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('on activated: ', activeInfo);
    // const isTabReady = await tabReady(activeInfo, activeInfo.tabId);
    // if (isTabReady) {
    updatedTab(activeInfo.tabId);
    return true;
    // }
    // return true;
}));
// Fires when a tab is updated:
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('onupdated tabId, changeInfo, tab ', tabId, changeInfo, tab);
    // const isTabReady = await tabReady(tab, tabId);
    // if (isTabReady) {
    updatedTab(tabId);
    // }
    return true;
}));
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('listener on message: ', request);
    if (request.host) {
        yield chrome.storage.sync.set({
            loading: true,
        });
        console.log('request.host: ', request.host);
        const overallScore = yield (0, bcorp_1.bcorpOverall)(request.host);
        console.log('overall score: ', overallScore);
        const overallScoreRounded = Number.parseFloat(overallScore).toFixed(2);
        const profileLink = yield (0, bcorp_1.bcorpProfile)(request.host);
        console.log('profile link? : ', profileLink);
        if (overallScore) {
            console.log('should update; ', overallScoreRounded, profileLink);
            yield chrome.storage.sync.set({
                host: request.host,
                score: overallScoreRounded,
                link: profileLink,
                loading: false,
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => __awaiter(void 0, void 0, void 0, function* () {
        if (query.menuItemId === 'ConsoleStorage') {
            chrome.storage.sync.get((result) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('storage: ', result);
            }));
        }
    }));
});


/***/ }),

/***/ "./src/app/constants/bcorp.ts":
/*!************************************!*\
  !*** ./src/app/constants/bcorp.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bcorpProfile = exports.bcorpOverall = void 0;
const changeHostPrefix = (host) => {
    if (host.slice(0, 4) === 'www.')
        return host.slice(4);
    return `www.${host}`;
};
const bcorpOverall = (host, secondTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`);
        // debugger
        const response = yield (res === null || res === void 0 ? void 0 : res.json());
        // debugger
        console.log('bcorpOverall response: ', response);
        console.log('bcorpOverall response: ', typeof response);
        if (!response && !secondTime) {
            console.log('running bcorp overall second time');
            return (0, exports.bcorpOverall)(changeHostPrefix(host), true);
        }
        return response;
    }
    catch (e) {
        console.error('bcorpOverall error: ', e);
        if (!secondTime) {
            (0, exports.bcorpOverall)(changeHostPrefix(host), true);
        }
    }
});
exports.bcorpOverall = bcorpOverall;
const bcorpProfile = (host, secondTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`);
        console.log('bcorp profile res: ', res);
        const response = yield (res === null || res === void 0 ? void 0 : res.text());
        console.log('bcorpProfile response: ', response);
        if (!response && !secondTime) {
            return (0, exports.bcorpProfile)(changeHostPrefix(host), true);
        }
        return response;
    }
    catch (e) {
        console.log('bcorpProfile error: ', e);
        if (!secondTime) {
            (0, exports.bcorpProfile)(changeHostPrefix(host), true);
        }
    }
});
exports.bcorpProfile = bcorpProfile;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLEVBQUUsSUFBSSxDQUFDO1NBQzdDO0tBQ0o7QUFDTCxDQUFDO0FBaEJZLG9CQUFZLGdCQWdCeEI7Ozs7Ozs7VUMzQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsZWFuc3VtZXItZXh0ZW5zaW9uLy4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL2NsZWFuc3VtZXItZXh0ZW5zaW9uLy4vc3JjL2FwcC9jb25zdGFudHMvYmNvcnAudHMiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGVhbnN1bWVyLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBjaHJvbWUgKi9cblxuY29uc29sZS5sb2coJ3RoZXN0Jyk7XG5pbXBvcnQgeyBiY29ycE92ZXJhbGwsIGJjb3JwUHJvZmlsZSB9IGZyb20gJy4vY29uc3RhbnRzL2Jjb3JwJ1xuXG5jaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgaG9zdDogJycsXG4gICAgc2NvcmU6IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gIH0pO1xuICBcbiAgLypcbiAgICBOYXRpdmUgQ2hyb21lIHBhZ2VzIHN1Y2ggYXMgbmV3VGFiIGFuZCBleHRlbnNpb24gd2lsbCByZWNlaXZlIGFuIGVycm9yIGR1ZSB0byBubyBjb250ZW50IHNjcmlwdFxuICAgIHJldHVybmluZyBmcm9tIHRoZSBzZW5kTWVzc2FnZSBjYWxsLiBUaGVyZWZvcmUsIHdlIHB1dCB0aGlzIGNvbmRpdGlvbmFsIHRvIGNvdmVyIGZvciB0aGlzIGVycm9yLlxuICAgICovXG5cbiAgY29uc3QgdGFiUmVhZHkgPSBhc3luYyAodGFicywgbGlzdGVuZXJUYWJJRCkgPT4ge1xuICAgIGNvbnN0IFthY3RpdmVUYWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICB9KTtcbiAgICByZXR1cm4gYWN0aXZlVGFiLnN0YXR1cyA9PT0gJ2NvbXBsZXRlJyAmJiAhYWN0aXZlVGFiLnBlbmRpbmdVcmwgJiYgIWFjdGl2ZVRhYi51cmwuc3RhcnRzV2l0aCgnY2hyb21lOi8vJykgJiYgYWN0aXZlVGFiLmlkID09PSBsaXN0ZW5lclRhYklEO1xuICB9O1xuICBcbiAgLy8gU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBjdXJyZW50IHRhYiB0aGF0IHRoZSB0YWIgaXMgdXBkYXRlZCBhbmQgc2hvdWxkIHJ1biBjb250ZW50IHNjcmlwdCBjaGVja3M6XG4gIGZ1bmN0aW9uIHVwZGF0ZWRUYWIodGFiSWQpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCB0YWI6ICcsIHRhYklkKTtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHtcbiAgICAgICAgdHlwZTogJ3VwZGF0ZWRUYWInLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgdGFiIGVycm9yOiAnLCBlKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZpcmVzIHdoZW4gdGhlIGFjdGl2ZSB0YWIgaW4gYSB3aW5kb3cgY2hhbmdlczpcbiAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGFjdGl2ZUluZm8pID0+IHtcbiAgICBjb25zb2xlLmxvZygnb24gYWN0aXZhdGVkOiAnLCBhY3RpdmVJbmZvKVxuICAgIC8vIGNvbnN0IGlzVGFiUmVhZHkgPSBhd2FpdCB0YWJSZWFkeShhY3RpdmVJbmZvLCBhY3RpdmVJbmZvLnRhYklkKTtcbiAgICAvLyBpZiAoaXNUYWJSZWFkeSkge1xuICAgICAgdXBkYXRlZFRhYihhY3RpdmVJbmZvLnRhYklkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgLy8gRmlyZXMgd2hlbiBhIHRhYiBpcyB1cGRhdGVkOlxuICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcbiAgICBjb25zb2xlLmxvZygnb251cGRhdGVkIHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIgJywgdGFiSWQsIGNoYW5nZUluZm8sIHRhYik7XG4gICAgLy8gY29uc3QgaXNUYWJSZWFkeSA9IGF3YWl0IHRhYlJlYWR5KHRhYiwgdGFiSWQpO1xuICBcbiAgICAvLyBpZiAoaXNUYWJSZWFkeSkge1xuICAgICAgdXBkYXRlZFRhYih0YWJJZCk7XG4gICAgLy8gfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnbGlzdGVuZXIgb24gbWVzc2FnZTogJywgcmVxdWVzdCk7XG4gICAgICBpZiAocmVxdWVzdC5ob3N0KSB7XG4gICAgICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XG4gICAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QuaG9zdDogJywgcmVxdWVzdC5ob3N0KTtcbiAgICAgICAgICBjb25zdCBvdmVyYWxsU2NvcmUgPSBhd2FpdCBiY29ycE92ZXJhbGwocmVxdWVzdC5ob3N0KTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3ZlcmFsbCBzY29yZTogJywgb3ZlcmFsbFNjb3JlKTtcbiAgICAgICAgICBjb25zdCBvdmVyYWxsU2NvcmVSb3VuZGVkID0gTnVtYmVyLnBhcnNlRmxvYXQob3ZlcmFsbFNjb3JlKS50b0ZpeGVkKDIpO1xuICAgICAgICAgIGNvbnN0IHByb2ZpbGVMaW5rID0gYXdhaXQgYmNvcnBQcm9maWxlKHJlcXVlc3QuaG9zdCk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2ZpbGUgbGluaz8gOiAnLCBwcm9maWxlTGluayk7XG4gICAgICAgICAgaWYgKG92ZXJhbGxTY29yZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2hvdWxkIHVwZGF0ZTsgJywgb3ZlcmFsbFNjb3JlUm91bmRlZCwgcHJvZmlsZUxpbmspXG4gICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICAgICAgICAgIGhvc3Q6IHJlcXVlc3QuaG9zdCxcbiAgICAgICAgICAgICAgICAgIHNjb3JlOiBvdmVyYWxsU2NvcmVSb3VuZGVkLFxuICAgICAgICAgICAgICAgICAgbGluazogcHJvZmlsZUxpbmssXG4gICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgfVxuICB9KTtcblxuLy8gUmlnaHQtQ2xpY2sgT3B0aW9uczpcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICBpZDogJ0NvbnNvbGVTdG9yYWdlJyxcbiAgICAgIHRpdGxlOiAnQ29uc29sZSBUaGUgU3RvcmFnZScsXG4gICAgICBjb250ZXh0czogWydhbGwnXSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQWN0aW9ucyBmb3IgUmlnaHQtQ2xpY2sgT3B0aW9uczpcbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChxdWVyeSkgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGFzeW5jICh0YWJzKSA9PiB7XG4gICAgICBpZiAocXVlcnkubWVudUl0ZW1JZCA9PT0gJ0NvbnNvbGVTdG9yYWdlJykge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JhZ2U6ICcsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTsiLCJjb25zdCBjaGFuZ2VIb3N0UHJlZml4ID0gKGhvc3Q6IHN0cmluZykgPT4ge1xuICAgIGlmIChob3N0LnNsaWNlKDAsIDQpID09PSAnd3d3LicpIHJldHVybiBob3N0LnNsaWNlKDQpO1xuICAgIHJldHVybiBgd3d3LiR7aG9zdH1gO1xufVxuXG5leHBvcnQgY29uc3QgYmNvcnBPdmVyYWxsID0gYXN5bmMgKGhvc3Q6IHN0cmluZywgc2Vjb25kVGltZT86IGJvb2xlYW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9iaXpkYXRhYXBpLmF6dXJld2Vic2l0ZXMubmV0L0Jpei9HZXRPdmVyQWxsU2NvcmU/d2Vic2l0ZT0ke2hvc3R9YCk7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVzPy5qc29uKClcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jjb3JwT3ZlcmFsbCByZXNwb25zZTogJywgcmVzcG9uc2UpO1xuICAgICAgICBjb25zb2xlLmxvZygnYmNvcnBPdmVyYWxsIHJlc3BvbnNlOiAnLCB0eXBlb2YgcmVzcG9uc2UpO1xuXG4gICAgICAgIGlmKCFyZXNwb25zZSAmJiAhc2Vjb25kVGltZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYmNvcnAgb3ZlcmFsbCBzZWNvbmQgdGltZScpXG4gICAgICAgICAgICByZXR1cm4gYmNvcnBPdmVyYWxsKGNoYW5nZUhvc3RQcmVmaXgoaG9zdCksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Jjb3JwT3ZlcmFsbCBlcnJvcjogJywgZSk7XG4gICAgICAgIGlmKCFzZWNvbmRUaW1lKSB7XG4gICAgICAgICAgICBiY29ycE92ZXJhbGwoY2hhbmdlSG9zdFByZWZpeChob3N0KSwgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJjb3JwUHJvZmlsZSA9IGFzeW5jIChob3N0OiBzdHJpbmcsIHNlY29uZFRpbWU/OiBib29sZWFuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2ggKGBodHRwczovL2JpemRhdGFhcGkuYXp1cmV3ZWJzaXRlcy5uZXQvQml6L0dldEJjb3JwUHJvZmlsZT93ZWJzaXRlPSR7aG9zdH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Jjb3JwIHByb2ZpbGUgcmVzOiAnLCByZXMpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcz8udGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnYmNvcnBQcm9maWxlIHJlc3BvbnNlOiAnLCByZXNwb25zZSk7XG4gICAgICAgIGlmKCFyZXNwb25zZSAmJiAhc2Vjb25kVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIGJjb3JwUHJvZmlsZShjaGFuZ2VIb3N0UHJlZml4KGhvc3QpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnYmNvcnBQcm9maWxlIGVycm9yOiAnLCBlKTtcbiAgICAgICAgaWYoIXNlY29uZFRpbWUpIHtcbiAgICAgICAgICAgIGJjb3JwUHJvZmlsZShjaGFuZ2VIb3N0UHJlZml4KGhvc3QpLCB0cnVlKVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9