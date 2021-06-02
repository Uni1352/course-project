/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/scss/index.scss */ \"./src/client/assets/scss/index.scss\");\n\nvar items = [];\n\nfunction calculateRemainDays(target) {\n  var current = new Date();\n  var remainDays = parseInt((target - current) / 1000 / 60 / 60 / 24);\n  return remainDays;\n}\n\nfunction getRandomColor() {\n  var _char = '0123456789abcdef';\n  var color = [];\n\n  for (var i = 0; i < 6; i++) {\n    var index = Math.floor(Math.random() * 16);\n    color.push(_char[index]);\n  }\n\n  return \"#\".concat(color.join(''));\n}\n\nfunction addEventItem() {\n  var data = {\n    title: $('#title').val(),\n    date: $('#deadline').val(),\n    day: calculateRemainDays(new Date($('#deadline').val())),\n    color: getRandomColor()\n  };\n\n  if (data.title && data.date) {\n    items.push(data);\n    appendItemToList(data);\n    console.log(items);\n  }\n}\n\nfunction appendItemToList(data) {\n  $('.list').append(\"<div class=\\\"list__item\\\" style=\\\"border-color: \".concat(data.color, \"\\\">\\n                        <div class=\\\"list__item--title\\\">\\n                          <p>\").concat(data.title, \"</p>\\n                          <div class=\\\"timer days\\\"><b>\").concat(data.day, \"</b> days left</div>\\n                        </div>\\n                        <div class=\\\"btn\\\">\\n                          <button id=\\\"edit\\\">edit</button>\\n                          <button id=\\\"delete\\\">delete</button>\\n                        </div>\\n                      </div>\"));\n}\n\nfunction deleteEventItem(index) {\n  items.splice(index, 1);\n}\n\nfunction updateEventItem(index) {\n  items[index] = {\n    title: $('#update #title').val(),\n    date: $('#update #deadline').val(),\n    days: calculateRemainDays(new Date($('#update #deadline').val())),\n    color: items[index].color\n  };\n}\n\nfunction startSocket() {\n  var ws = new WebSocket('ws://localhost:8080/');\n\n  ws.onopen = function () {\n    return console.log('Connection Opened!');\n  };\n\n  ws.onclose = function () {\n    return console.log('Connection Closed!');\n  };\n}\n\n$(document).ready(function () {\n  $('#title').val('');\n  $('#deadline').val('');\n  startSocket();\n}); // add item\n\n$('#submit').click(function () {\n  addEventItem();\n  $('#title').val('');\n  $('#deadline').val('');\n}); // delete item\n\n$(document).on('click', '#delete', function () {\n  deleteEventItem($(this).parent().parent().index());\n  $(this).parent().parent().remove();\n}); // edit item\n\n$(document).on('click', '#edit', function () {\n  var content = $(this).parent().siblings();\n  var index = $(this).parent().parent().index();\n\n  if ($(this).hasClass('edit')) {\n    updateEventItem(index);\n    $(this).removeClass('edit');\n    $(this).text('edit');\n    content.html(\"<div class=\\\"list__item--title\\\">\\n                    <p>\".concat(items[index].title, \"</p>\\n                    <div class=\\\"timer days\\\"><b>\").concat(items[index].days, \"</b> days left</div>\\n                  </div>\"));\n  } else {\n    $(this).addClass('edit');\n    $(this).text('update');\n    content.html(\"<form id=\\\"update\\\">\\n                    <input type=\\\"text\\\" id=\\\"title\\\" name=\\\"eventTitle\\\" value=\\\"\".concat(items[index].title, \"\\\">\\n                    <input type=\\\"date\\\" id=\\\"deadline\\\" name=\\\"eventDate\\\" value=\\\"\").concat(items[index].date, \"\\\">\\n                  </form>\"));\n  }\n});\n\n//# sourceURL=webpack://digital-art-course-project/./src/client/index.js?");

/***/ }),

/***/ "./src/client/assets/scss/index.scss":
/*!*******************************************!*\
  !*** ./src/client/assets/scss/index.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://digital-art-course-project/./src/client/assets/scss/index.scss?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/index.js");
/******/ 	
/******/ })()
;