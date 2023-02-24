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
    console.log('host: ', normalized);
    chrome.runtime.sendMessage({
        host: host,
    });
});
checkSite();
chrome.runtime.onMessage.addListener((request) => {
    console.log('request: ', request.type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQkFBbUI7Ozs7Ozs7Ozs7QUFFbkIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUNuQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNsRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN6QztJQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUosTUFBTSxTQUFTLEdBQUcsR0FBUyxFQUFFO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN2QixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUMsQ0FBQztBQUNULENBQUMsRUFBQztBQUVGLFNBQVMsRUFBRSxDQUFDO0FBRVosTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUM7UUFDOUIsU0FBUyxFQUFFLENBQUM7S0FDZjtBQUNMLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztVRTVCSDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vLi9zcmMvYXBwL2NvbnRlbnQudHMiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGVhbnN1bWVyLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xlYW5zdW1lci1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBjaHJvbWUgKi9cblxuY29uc3Qgbm9ybWFsaXplSG9zdCA9IChob3N0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoaG9zdC5pbmRleE9mKCd3d3cuJykgIT09IC0xICYmIGhvc3QuaW5kZXhPZignaHR0cHM6Ly8nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBob3N0LnNsaWNlKDEyKS5yZXBsYWNlKC8gL2csICcnKTtcbiAgICB9XG4gICAgaWYgKGhvc3QuaW5kZXhPZignd3d3LicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGhvc3Quc2xpY2UoNCkucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiBob3N0LnJlcGxhY2UoLyAvZywgJycpO1xuICB9O1xuXG5jb25zdCBjaGVja1NpdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaG9zdCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVIb3N0KGhvc3QpO1xuICAgIGNvbnNvbGUubG9nKCdob3N0OiAnLCBub3JtYWxpemVkKTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICB9KTtcbn07XG5cbmNoZWNrU2l0ZSgpO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QpID0+IHtcbiAgICBjb25zb2xlLmxvZygncmVxdWVzdDogJywgcmVxdWVzdC50eXBlKTtcbiAgICBpZiAocmVxdWVzdC50eXBlID09PSAndXBkYXRlZFRhYicpe1xuICAgICAgICBjaGVja1NpdGUoKTtcbiAgICB9XG59KTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2FwcC9jb250ZW50LnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=