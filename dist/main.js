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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_apiFuncs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/apiFuncs */ \"./src/modules/apiFuncs.js\");\n\n\nconst formManager = new _modules_apiFuncs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nformManager.initForm();\n\n\n\n//# sourceURL=webpack://odin-weather/./src/index.js?");

/***/ }),

/***/ "./src/modules/apiFuncs.js":
/*!*********************************!*\
  !*** ./src/modules/apiFuncs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormManager)\n/* harmony export */ });\nclass FormManager {\n    constructor() {\n        this.form = document.getElementById(\"weather-form\");\n        this.formValue = document.getElementById(\"location-input\");\n        this.location = \"\";\n    }\n\n    initForm() {\n        const boundReturnLocation = this.returnLocation.bind(this);\n        this.form.addEventListener(\"submit\", boundReturnLocation);\n    }\n\n    getCityLocation() {\n        return this.formValue.value;\n    }\n\n    cleanLocationInput(loc) {\n        loc.replace(/(\\s+$|^\\s+)/g, ''); //remove whitespace from before and end of string\n        loc.replace(/(,\\s+)/g); // remove whitespace from after a comma\n        loc.replace(/(\\s+,)/g); //remove whitespace from before a comma\n        loc.replace(/\\s+/g, \"+\") // replace whitespace left with + i.e New Zealand => New+Zealand so works with api\n\n        return loc;\n    }\n\n    buildCoordsURL(loc) {\n        return `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=5b9d734e5dc27e5f513dd3c42ab228de`;\n    }\n\n    buildBGGif(keyword) {\n        return `https://api.giphy.com/v1/gifs/translate?api_key=tfjaWqYrtGm6otk7M6O15iwfJMOrvogz&s=${keyword}`\n    }\n\n    buildKeyWord(keyword) {\n        return keyword.replace(/(\\s+)/g, \"+\");\n        \n    }\n\n    async setBackground(keyword) {\n        const body = document.body;\n        const newKeyword = this.buildKeyWord(keyword);\n        const url = this.buildBGGif(newKeyword);\n        console.log(newKeyword, url)\n        const img = await fetch(url, {mode: \"cors\"});\n        const imgJSON =  await img.json();\n        console.log(imgJSON)\n        body.style.backgroundImage = `url(${imgJSON.data.images.downsized_large.url})`;\n    }\n\n    async getCityInfo(url) {\n        const response = await fetch(url);\n        const data = await response.json();\n\n        return data;\n    }\n\n    async getWeatherInfo(lat, long) {\n        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b9d734e5dc27e5f513dd3c42ab228de`, {mode: \"cors\"});\n        const response = await data.json();\n    \n        return response;    \n    }\n\n    async returnLocation() {\n        const enteredLoc = this.getCityLocation();\n        const cleanedLoc = this.cleanLocationInput(enteredLoc);\n        const coordsURL = this.buildCoordsURL(cleanedLoc);\n        const cityInfo = await this.getCityInfo(coordsURL);\n        const cityCoords = {lat: cityInfo[0].lat, lon:cityInfo[0].lon};\n        const weatherInfo = await this.getWeatherInfo(cityCoords.lat, cityCoords.lon);\n        this.setBackground(weatherInfo.weather[0].description);\n        console.log(cityInfo, weatherInfo);\n\n        this.buildPageWithData(weatherInfo, cityInfo);\n\n    }\n\n    buildPageWithData(weatherData, cityData) {\n        this.buildCurrentWeather(weatherData, cityData);\n    }\n\n    buildCurrentWeather(weatherData, cityData) {\n        const currentHeader = document.querySelector(\".current-weather-desc\");\n        currentHeader.innerText = weatherData.weather[0].description;\n\n        const currentLocation = document.querySelector(\".current-weather-location\");\n        currentLocation.innerText = cityData[0].name;\n\n        const temp = document.querySelector(\".temp\");\n        console.log(weatherData.main.temp)\n        temp.innerText = \"Current Temperature: \" + Math.round((weatherData.main.temp - 273.15)) + \"°C\";\n\n        const feelsLike = document.querySelector(\".feels-like\");\n        feelsLike.innerText = \"Feels Like: \" + Math.round((weatherData.main.feels_like - 273.15)) + \"°C\";\n\n        const wind = document.querySelector(\".wind\");\n        wind.innerText = \"Wind: \" + Math.round(weatherData.wind.speed / 1.609) + \" kph\";\n\n        const humidity = document.querySelector(\".humidity\");\n        humidity.innerText = \"Humidity: \" + weatherData.main.humidity + \"%\";\n    }\n\n    \n}\n\n\n\n\n\n//# sourceURL=webpack://odin-weather/./src/modules/apiFuncs.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;