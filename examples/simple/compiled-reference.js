webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    org: Kotlin.definePackage(null, /** @lends _.org */ {
      test: Kotlin.definePackage(null, /** @lends _.org.test */ {
        main_kand9s$: function (args) {
          Kotlin.println(_.org.test.getSomething());
        },
        getSomething: function () {
          return 'Hello, world!';
        }
      })
    })
  });
  Kotlin.defineModule('_compiled-tmp', _);
  _.org.test.main_kand9s$([]);
  return _;
}(__webpack_require__(0));

//@ sourceMappingURL=_compiled-tmp.js.map


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);

/***/ })
],[3]);
//# sourceMappingURL=build.js.map