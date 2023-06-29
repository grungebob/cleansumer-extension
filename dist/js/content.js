/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/content.ts":
/*!****************************!*\
  !*** ./src/app/content.ts ***!
  \****************************/
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
const normalizeHost = (host) => {
    if (host.indexOf('www.') !== -1 && host.indexOf('https://') !== -1) {
        return host.slice(12).replace(/ /g, '');
    }
    if (host.indexOf('www.') !== -1) {
        return host.slice(4).replace(/ /g, '');
    }
    return host.replace(/ /g, '');
};
const checkSite = () => __awaiter(this, void 0, void 0, function* () {
    const host = window.location.host;
    const normalized = normalizeHost(host);
    // console.log('host: ', normalized);
    chrome.runtime.sendMessage({
        host: host,
    });
});
checkSite();
chrome.runtime.onMessage.addListener((request) => {
    // console.log('request: ', request.type);
    if (request.type === 'updatedTab') {
        checkSite();
    }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app/content.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQkFBbUI7Ozs7Ozs7Ozs7QUFFbkIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUNuQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNsRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN6QztJQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUosTUFBTSxTQUFTLEdBQUcsR0FBUyxFQUFFO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxxQ0FBcUM7SUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUM7QUFDVCxDQUFDLEVBQUM7QUFFRixTQUFTLEVBQUUsQ0FBQztBQUVaLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzdDLDBDQUEwQztJQUMxQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFDO1FBQzlCLFNBQVMsRUFBRSxDQUFDO0tBQ2Y7QUFDTCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7VUU1Qkg7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsZWFuc3VtZXItZXh0ZW5zaW9uLy4vc3JjL2FwcC9jb250ZW50LnRzIiwid2VicGFjazovL2NsZWFuc3VtZXItZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NsZWFuc3VtZXItZXh0ZW5zaW9uL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgY2hyb21lICovXG5cbmNvbnN0IG5vcm1hbGl6ZUhvc3QgPSAoaG9zdDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGhvc3QuaW5kZXhPZignd3d3LicpICE9PSAtMSAmJiBob3N0LmluZGV4T2YoJ2h0dHBzOi8vJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gaG9zdC5zbGljZSgxMikucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgfVxuICAgIGlmIChob3N0LmluZGV4T2YoJ3d3dy4nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBob3N0LnNsaWNlKDQpLnJlcGxhY2UoLyAvZywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gaG9zdC5yZXBsYWNlKC8gL2csICcnKTtcbiAgfTtcblxuY29uc3QgY2hlY2tTaXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhvc3QgPSB3aW5kb3cubG9jYXRpb24uaG9zdDtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplSG9zdChob3N0KTtcbiAgICAvLyBjb25zb2xlLmxvZygnaG9zdDogJywgbm9ybWFsaXplZCk7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBob3N0OiBob3N0LFxuICAgICAgfSk7XG59O1xuXG5jaGVja1NpdGUoKTtcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlcXVlc3Q6ICcsIHJlcXVlc3QudHlwZSk7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gJ3VwZGF0ZWRUYWInKXtcbiAgICAgICAgY2hlY2tTaXRlKCk7XG4gICAgfVxufSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9hcHAvY29udGVudC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9