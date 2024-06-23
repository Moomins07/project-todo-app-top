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

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction Todo(project, date) {\n  this.project = project;\n  this.date = (0,_utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(date);\n  this.id = Math.random().toString(16).slice(2);\n  this.dateOfCreation = (0,_utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Date.now());\n  this.isUrgest = null;\n  this.description = null;\n  this.todos = [];\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);\n\n//# sourceURL=webpack://webpack-starter/./src/Todo.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MODAL: () => (/* binding */ MODAL),\n/* harmony export */   TODO_CONTAINER: () => (/* binding */ TODO_CONTAINER)\n/* harmony export */ });\nvar TODO_CONTAINER = document.getElementById('project-cards');\nvar MODAL = document.getElementById('updateTodoModal');\n\n\n//# sourceURL=webpack://webpack-starter/./src/constants.js?");

/***/ }),

/***/ "./src/eventHandlers.js":
/*!******************************!*\
  !*** ./src/eventHandlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n\n\n\n\n\n\n\nfunction setEventListeners() {\n  document.getElementById('add-todo').addEventListener('click', _state__WEBPACK_IMPORTED_MODULE_0__._newTodo);\n  document.getElementById('project-cards').addEventListener('click', _ui__WEBPACK_IMPORTED_MODULE_1__._handleClick);\n  // Event handlers to close Modal\n  document.getElementById('closeModalButton').addEventListener('click', _ui__WEBPACK_IMPORTED_MODULE_1__._closeModal);\n  document.addEventListener('keydown', _ui__WEBPACK_IMPORTED_MODULE_1__._closeModalEscKey);\n  _constants__WEBPACK_IMPORTED_MODULE_2__.MODAL.addEventListener('click', _ui__WEBPACK_IMPORTED_MODULE_1__._closeModalClickOutside);\n  document.querySelector('.modal').addEventListener('click', _ui__WEBPACK_IMPORTED_MODULE_1__._handleModalClick);\n  (0,_state__WEBPACK_IMPORTED_MODULE_0__._defaultProjects)();\n  (0,_ui__WEBPACK_IMPORTED_MODULE_1__._renderTodosToDOM)();\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setEventListeners);\n\n//# sourceURL=webpack://webpack-starter/./src/eventHandlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventHandlers */ \"./src/eventHandlers.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _eventHandlers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://webpack-starter/./src/index.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   _defaultProjects: () => (/* binding */ _defaultProjects),\n/* harmony export */   _findIndex: () => (/* binding */ _findIndex),\n/* harmony export */   _grabTodoId: () => (/* binding */ _grabTodoId),\n/* harmony export */   _newTodo: () => (/* binding */ _newTodo),\n/* harmony export */   addProject: () => (/* binding */ addProject),\n/* harmony export */   getCurrentTodo: () => (/* binding */ getCurrentTodo),\n/* harmony export */   getTodos: () => (/* binding */ getTodos),\n/* harmony export */   removeTodo: () => (/* binding */ removeTodo),\n/* harmony export */   setCurrentTodo: () => (/* binding */ setCurrentTodo),\n/* harmony export */   updateTodo: () => (/* binding */ updateTodo)\n/* harmony export */ });\n/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ \"./src/Todo.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\nvar todos = [];\nvar currentTodo = null;\nfunction getCurrentTodo() {\n  return currentTodo;\n}\nfunction setCurrentTodo(todo) {\n  currentTodo = todo;\n}\nfunction addProject(todo) {\n  todos.push(todo);\n}\nfunction _findIndex(id) {\n  var index = todos.findIndex(function (todo) {\n    return todo.id === id;\n  });\n  return index;\n}\nfunction _grabTodoId(e) {\n  var id = e.target.closest('.card').getAttribute('data-id');\n  return id;\n}\nfunction removeTodo(id) {\n  var index = _findIndex(id);\n  if (index !== -1) {\n    todos.splice(index, 1);\n  }\n}\nfunction getTodos() {\n  return todos;\n}\nfunction updateTodo(id) {\n  var index = _findIndex(id);\n  if (index !== -1) {\n    console.log(\"found todo \".concat(index));\n  }\n}\nfunction _newTodo(e) {\n  var projectText = document.getElementById('project').value;\n  var projectDate = document.getElementById('project-date').value;\n\n  // if (projectText === '' || projectDate === '') {\n  //     alert('Please fill in both fields!')\n  // } else {\n  e.preventDefault();\n  var todo = new _Todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectText, projectDate);\n  addProject(todo);\n  (0,_ui__WEBPACK_IMPORTED_MODULE_1__._renderTodosToDOM)();\n  console.log(todos[2].todos);\n  // }\n}\nfunction _defaultProjects() {\n  var project1 = new _Todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Code more JavaScript', '07/03/2024');\n  var project2 = new _Todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Code even more JavaScript', '07/03/2024');\n  project2.todos.push('test', 'test1');\n  addProject(project1);\n  addProject(project2);\n}\n\n\n//# sourceURL=webpack://webpack-starter/./src/state.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   _closeModal: () => (/* binding */ _closeModal),\n/* harmony export */   _closeModalClickOutside: () => (/* binding */ _closeModalClickOutside),\n/* harmony export */   _closeModalEscKey: () => (/* binding */ _closeModalEscKey),\n/* harmony export */   _handleClick: () => (/* binding */ _handleClick),\n/* harmony export */   _handleModalClick: () => (/* binding */ _handleModalClick),\n/* harmony export */   _renderTodosToDOM: () => (/* binding */ _renderTodosToDOM)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n\n\nfunction _displayTodo(todo) {\n  var div = document.createElement('div');\n  var todoList = document.createElement('div');\n  var ul = document.createElement('ul');\n  div.classList.add('project-card', 'card', 'group');\n  div.setAttribute('data-id', todo.id);\n  div.innerHTML = \"\\n    <i class=\\\"fa-lg fa-regular fa-circle-xmark delete\\\"></i>\\n    <h2 class=\\\"text-2xl truncate break-words\\\">\".concat(todo.project, \"</h2>\\n    <h3 class=\\\"text-sm\\\">\").concat(todo.date, \"</h3>\\n    <p class=\\\"truncate-words\\\">\").concat(todo.description ? todo.description : 'Click to add todos!', \"</p>\");\n  todoList.classList.add('todo-list');\n  div.appendChild(todoList);\n  todoList.appendChild(ul);\n  var todoArr = _toConsumableArray(todo.todos);\n  todoArr.forEach(function (todo) {\n    var li = document.createElement('li');\n    li.innerHTML = todo;\n    ul.appendChild(li);\n  });\n  _constants__WEBPACK_IMPORTED_MODULE_1__.TODO_CONTAINER.appendChild(div);\n}\nfunction _findTodo(e) {\n  var todoId = (0,_state__WEBPACK_IMPORTED_MODULE_0__._grabTodoId)(e); // Extract the todo ID directly from the event\n  var todos = (0,_state__WEBPACK_IMPORTED_MODULE_0__.getTodos)(); // Get the current todos array\n  var todo = todos.find(function (todo) {\n    return todo.id === todoId;\n  }); // Use .find() to get the todo object\n\n  return todo;\n}\nfunction _showAndPopulateModal(e) {\n  _constants__WEBPACK_IMPORTED_MODULE_1__.MODAL.classList.remove('hidden');\n  var todo = _findTodo(e);\n  if (todo) {\n    _populateModal(todo);\n  } else {\n    console.error('Todo not found.');\n  }\n}\nfunction _populateModal(todo) {\n  var modalProjectTitle = document.getElementById('todoTitle');\n  var modalProjectDate = document.getElementById('todoDate');\n  var modalProjectDescription = document.getElementById('todoDescription');\n  var modalTodoList = document.getElementById('checklistItems');\n  modalProjectTitle.value = todo.project;\n  if (modalProjectDate) {\n    var dateText = todo.date; // e.g., \"03-07-2024\"\n    var _dateText$split = dateText.split('-'),\n      _dateText$split2 = _slicedToArray(_dateText$split, 3),\n      day = _dateText$split2[0],\n      month = _dateText$split2[1],\n      year = _dateText$split2[2];\n    var formattedDate = \"\".concat(year, \"-\").concat(month, \"-\").concat(day); // Convert to \"2024-07-03\"\n\n    modalProjectDate.value = formattedDate;\n  } else throw new Error('No date element found');\n  if (modalProjectDescription) {\n    modalProjectDescription.value = todo.description;\n  } else throw new Error('No date element found');\n  if (modalTodoList) {\n    modalTodoList.innerHTML = '';\n    // const liArray = [...liElements]\n    todo.todos.forEach(function (item) {\n      var li = document.createElement('li'); // Create a new <li> element\n      li.classList.add('modalListItem');\n      li.textContent = item; // Assuming each todo item has a 'text' property\n      li.classList.add('mb-4'); // Add class for styling\n      modalTodoList.appendChild(li); // Append the new <li> to the modal list\n    });\n  }\n}\nfunction _closeModal() {\n  _constants__WEBPACK_IMPORTED_MODULE_1__.MODAL.classList.add('hidden');\n}\nfunction _closeModalEscKey(e) {\n  if (e.key === 'Escape') {\n    _closeModal();\n  }\n}\nfunction _closeModalClickOutside(e) {\n  if (!e.target.closest('.modal')) {\n    _closeModal();\n  }\n}\nfunction _handleModalClick(e) {\n  if (e.target.classList.contains('modalAddItem')) {\n    e.stopPropagation();\n    _addItemToModaList(e);\n  } else if (e.target.classList.contains('modalUpdate')) {\n    e.stopPropagation();\n    e.preventDefault();\n    _updateTodo(e);\n  }\n}\nfunction _addItemToModaList(e) {\n  var modalList = document.getElementById('checklistItems');\n  var checkListInput = document.getElementById('checklistItemInput');\n  if (checkListInput.value == '') {\n    alert('Please input a value first!');\n  } else {\n    var listItem = document.createElement('li');\n    listItem.textContent = checkListInput.value;\n    listItem.style.color = 'green';\n    modalList.appendChild(listItem);\n  }\n}\nfunction _renderTodosToDOM() {\n  _constants__WEBPACK_IMPORTED_MODULE_1__.TODO_CONTAINER.innerHTML = ''; // Clear the container here, before the loop\n  (0,_state__WEBPACK_IMPORTED_MODULE_0__.getTodos)().forEach(function (todo) {\n    _displayTodo(todo);\n  });\n}\nfunction _handleClick(e) {\n  if (e.target.classList.contains('delete')) {\n    _removeTodo(e);\n  } else if (e.target.closest('.project-card')) {\n    e.stopPropagation();\n    _showAndPopulateModal(e);\n    var todo = _findTodo(e);\n    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setCurrentTodo)(todo);\n  }\n}\nfunction _removeTodo(e) {\n  if (confirm('Are you sure you want to delete this project?')) {\n    var id = (0,_state__WEBPACK_IMPORTED_MODULE_0__._grabTodoId)(e);\n    (0,_state__WEBPACK_IMPORTED_MODULE_0__.removeTodo)(id);\n    e.stopPropagation();\n    _renderTodosToDOM();\n  }\n}\nfunction _updateTodo(e) {\n  var todoList = document.querySelector('.todo-list');\n  var li = document.querySelectorAll();\n  var liArr = [];\n  var todo = (0,_state__WEBPACK_IMPORTED_MODULE_0__.getCurrentTodo)();\n  todoList.firstChild.forEach(function (li) {\n    liArr.push(li);\n  });\n  console.log(todo);\n}\n\n\n//# sourceURL=webpack://webpack-starter/./src/ui.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction formatDate(date) {\n  if (date) {\n    var d = new Date(date);\n    var day = String(d.getDate()).padStart(2, '0');\n    var month = String(d.getMonth() + 1).padStart(2, '0'); // Months start at 0\n    var year = d.getFullYear();\n    return \"\".concat(day, \"-\").concat(month, \"-\").concat(year);\n  } else return \"No date set\";\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDate);\n\n//# sourceURL=webpack://webpack-starter/./src/utils.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-starter/./src/css/style.css?");

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