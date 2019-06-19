/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/currency-converter.js":
/*!***********************************!*\
  !*** ./src/currency-converter.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//  Predefined config object with currencies\nvar hardcodedCurrencies = {\n  EUR: {\n    CHF: 1.3135,\n    USD: 1.2897,\n    GBP: 0.8631\n  },\n  USD: {\n    JPY: 109.6200,\n    CHF: 1.3135,\n    GBP: 0.8631,\n    EUR: 0.983\n  },\n  CHF: {\n    USD: 0.9960,\n    GBP: 0.8631,\n    EUR: 0.983,\n    JPY: 109.6200\n  },\n  GBP: {\n    CAD: 1.7574,\n    USD: 0.9960,\n    EUR: 0.983,\n    JPY: 109.6200,\n    CHF: 1.3135\n  }\n};\n\nvar CurrencyCoverter = function (hasCurrencies) {\n  var currencies = {};\n  var calculatedAmount = document.getElementById('calculated-amount');\n  var submitButton = document.getElementById('submit');\n\n  if (!hasCurrencies) {\n    currencies = hardcodedCurrencies;\n  } else {\n    currencies = hasCurrencies;\n  }\n\n  function validateInput() {\n    var input = document.getElementById('amount');\n\n    if (!input.value) {\n      input.style.border = '2px solid red';\n      return false;\n    } else {\n      input.style.border = '1px solid #ced4da';\n      return true;\n    }\n  }\n\n  function getFormData() {\n    if (validateInput() === true) {\n      var amount, from, to;\n      amount = document.getElementById('amount');\n      if (amount) amount = parseInt(amount.value);\n      from = document.getElementById('from');\n      if (from) from = from.value;\n      to = document.getElementById('to');\n      if (to) to = to.value;\n      return {\n        amount: amount,\n        from: from,\n        to: to\n      };\n    } else {\n      return false;\n    }\n  }\n\n  function getCurrencyExchangeRates(event) {\n    event.preventDefault();\n\n    if (getFormData() != false) {\n      var fD = getFormData();\n      var xhr = new XMLHttpRequest();\n      var apiKey = 'latest?access_key=789b6637e9d33c71debd4b01b758a5e1';\n      var queryParams = \"&base=\".concat(fD.from, \"&symbols=EUR,JPY,GBP,CHF,USD\");\n      var server = \"http://data.fixer.io/api/\".concat(apiKey + queryParams);\n\n      if (fD.from != 'EUR') {\n        showConversion(false);\n      } else {\n        xhr.open('GET', server, true);\n        xhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\n\n        xhr.onreadystatechange = function () {\n          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) var response = JSON.parse(this.response);\n          if (response && response.success) showConversion(response);else if (response && response.error && response.error.type) console.log(response.error.type);\n        };\n\n        xhr.send();\n      }\n    }\n  }\n\n  function showConversion(response) {\n    var fD = getFormData();\n    var calculatedConversion = 0;\n    if (fD.from == fD.to) calculatedConversion = fD.amount;else // Because the currency API is not working for more than EUR currency \n      // predefined config object is used to obtain all the cases \n      if (response === false) calculatedConversion = fD.amount * currencies[fD.from][fD.to];else calculatedConversion = fD.amount * response.rates[fD.to];\n    calculatedAmount.innerHTML = \"\".concat(fD.amount.toFixed(2), \" \").concat(fD.from, \" is \").concat(calculatedConversion.toFixed(2), \" \").concat(fD.to);\n  }\n\n  submitButton.addEventListener('click', getCurrencyExchangeRates);\n}();\n\nmodule.exports.CurrencyCoverter;\n\n//# sourceURL=webpack:///./src/currency-converter.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar cc = __webpack_require__(/*! ./currency-converter */ \"./src/currency-converter.js\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles.css?");

/***/ })

/******/ });