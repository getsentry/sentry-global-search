/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = __webpack_require__(185)
exports.createHash = exports.Hash = __webpack_require__(999)
exports.createHmac = exports.Hmac = __webpack_require__(880)

var algos = __webpack_require__(90)
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = __webpack_require__(651)
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = __webpack_require__(460)

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = __webpack_require__(910)

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = __webpack_require__(924)

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = __webpack_require__(174)

var publicEncrypt = __webpack_require__(453)

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

var rf = __webpack_require__(49)

exports.randomFill = rf.randomFill
exports.randomFillSync = rf.randomFillSync

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}


/***/ }),

/***/ 460:
/***/ ((module) => {

module.exports = require("browserify-cipher");

/***/ }),

/***/ 924:
/***/ ((module) => {

module.exports = require("browserify-sign");

/***/ }),

/***/ 90:
/***/ ((module) => {

module.exports = require("browserify-sign/algos");

/***/ }),

/***/ 174:
/***/ ((module) => {

module.exports = require("create-ecdh");

/***/ }),

/***/ 999:
/***/ ((module) => {

module.exports = require("create-hash");

/***/ }),

/***/ 880:
/***/ ((module) => {

module.exports = require("create-hmac");

/***/ }),

/***/ 910:
/***/ ((module) => {

module.exports = require("diffie-hellman");

/***/ }),

/***/ 651:
/***/ ((module) => {

module.exports = require("pbkdf2");

/***/ }),

/***/ 453:
/***/ ((module) => {

module.exports = require("public-encrypt");

/***/ }),

/***/ 185:
/***/ ((module) => {

module.exports = require("randombytes");

/***/ }),

/***/ 49:
/***/ ((module) => {

module.exports = require("randomfill");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "SentryGlobalSearch": () => (/* reexport */ sentry_global_search),
  "extrapolate": () => (/* reexport */ lib_extrapolate),
  "htmlToAlgoliaRecord": () => (/* reexport */ html_to_algolia_record),
  "sentryAlgoliaIndexSettings": () => (/* reexport */ sentry_algolia_index_settings),
  "standardSDKSlug": () => (/* reexport */ standard_sdk_slug)
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/toConsumableArray"
const toConsumableArray_namespaceObject = require("@babel/runtime/helpers/toConsumableArray");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "algoliasearch/lite"
const lite_namespaceObject = require("algoliasearch/lite");
var lite_default = /*#__PURE__*/__webpack_require__.n(lite_namespaceObject);
;// CONCATENATED MODULE: external "title-case"
const external_title_case_namespaceObject = require("title-case");
;// CONCATENATED MODULE: ./src/sentry-global-search/lib/pretty-path.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

 // The left hand side is the text to match, right hand side the text to replace.
// Left hand side text is case insensitive.

var SPECIAL_CASES = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  sdk: 'SDK',
  api: 'API'
};

var prettyPath = function prettyPath(input) {
  var specialCases = Object.keys(SPECIAL_CASES).reduce(function (a, k) {
    return _objectSpread(_objectSpread({}, a), {}, defineProperty_default()({}, k.toLowerCase(), SPECIAL_CASES[k]));
  }, {});
  var segments = input.split('/').filter(Boolean);
  var re = new RegExp("(".concat(Object.keys(specialCases).join('|'), ")"), 'gi');
  var recased = segments.map(function (x) {
    var titlecased = (0,external_title_case_namespaceObject.titleCase)(decodeURIComponent(x).replace(/-/, ' '));
    var customCases = titlecased.split(re);
    var replaced = customCases.map(function (x) {
      return specialCases[x.toLowerCase()] || x;
    });
    return replaced.join('');
  });
  return recased.join(' > ');
};

/* harmony default export */ const pretty_path = (prettyPath);
;// CONCATENATED MODULE: ./src/sentry-global-search/lib/transformers.ts


function transformers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function transformers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? transformers_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : transformers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }


var transformDocsGatsbyHit = function transformDocsGatsbyHit(hit) {
  var obj = {
    id: hit.objectID,
    site: 'docs',
    url: "https://docs.sentry.io".concat(hit.url),
    context: {
      context1: pretty_path(hit.url)
    }
  };
  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
var transformDevelopHit = function transformDevelopHit(hit) {
  var obj = {
    id: hit.objectID,
    site: 'develop',
    url: "https://develop.sentry.dev".concat(hit.url),
    context: {
      context1: pretty_path(hit.url)
    }
  };
  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
var transformHelpCenterHit = function transformHelpCenterHit(hit) {
  var obj = {
    id: hit.objectID,
    site: 'blog',
    context: transformers_objectSpread({}, hit.context),
    url: "https://help.sentry.io".concat(hit.url).concat(hit.anchor ? "#".concat(hit.anchor) : '')
  };
  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
var transformBlogHit = function transformBlogHit(hit) {
  var obj = {
    id: hit.objectID,
    site: 'blog',
    context: {
      context1: hit.title
    },
    url: "https://blog.sentry.io".concat(hit.url).concat(hit.anchor ? "#".concat(hit.anchor) : '')
  };
  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
;// CONCATENATED MODULE: ./src/sentry-global-search/lib/config.ts


function config_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function config_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? config_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : config_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var config = function config(settings) {
  return config_objectSpread({
    pathBias: false,
    platformBias: true,
    legacyBias: true
  }, settings);
};

var defaultQueryParams = {
  snippetEllipsisText: '…',
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>'
};
var sites = [config({
  site: 'docs',
  name: 'Documentation',
  indexes: [{
    indexName: 'sentry-docs',
    transformer: transformDocsGatsbyHit
  }]
}), config({
  site: 'develop',
  name: 'Developer Documentation',
  indexes: [{
    indexName: 'develop-docs',
    transformer: transformDevelopHit
  }]
}), config({
  site: 'help-center',
  name: 'Help Center',
  indexes: [{
    indexName: 'sentry-help',
    transformer: transformHelpCenterHit
  }]
}), config({
  site: 'blog',
  name: 'Blog Posts',
  indexes: [{
    indexName: 'sentry-blog-posts',
    transformer: transformBlogHit
  }]
})];
;// CONCATENATED MODULE: ./src/sentry-global-search/sentry-global-search.ts







function sentry_global_search_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function sentry_global_search_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? sentry_global_search_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : sentry_global_search_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var errorType = "SentryGlobalSearchError";

var SentryGlobalSearch = /*#__PURE__*/function () {
  function SentryGlobalSearch() {
    var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    classCallCheck_default()(this, SentryGlobalSearch);

    // Complain if no configuration has been provided
    if (configs.length === 0 || !Array.isArray(configs)) {
      throw new Error("".concat(errorType, ": SentryGlobalSearch must be initialized with an array that includes one or more of: ").concat(sites.map(function (x) {
        return x.site;
      }).join(', '), "."));
    } // Validate configuration


    this.configs = configs.map(function (x) {
      var config = typeof x === 'string' ? {
        site: x
      } : x;
      var defaults = sites.find(function (x) {
        return x.site === config.site;
      });
      if (!!defaults) return sentry_global_search_objectSpread(sentry_global_search_objectSpread({}, defaults), config);
      throw new Error("".concat(errorType, ": unknown site \"").concat(config.site, "\" in config.include"));
    }); // Create an Algolia client to work with

    this.client = lite_default()('OOK48W9UCL', '2d64ec1106519cbc672d863b0d200782');
    this.query = this.query.bind(this);
  }

  createClass_default()(SentryGlobalSearch, [{
    key: "query",
    value: function () {
      var _query2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(_query) {
        var args,
            sanitizedQuery,
            client,
            configs,
            searchAllIndexes,
            configsToSearch,
            queries,
            _yield$client$search,
            algoliaResults,
            results,
            _args = arguments;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                args = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                if (_query) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", []);

              case 3:
                // Strip out all but Basic Latin, to minimize impact from bot search that
                // uses random characters. We don't have localized docs so there's no point
                // in searching non-latin characters.
                sanitizedQuery = _query.replace(/[^\u0020-\u007f]/gi, '');
                client = this.client, configs = this.configs;
                searchAllIndexes = args.searchAllIndexes || false;
                configsToSearch = searchAllIndexes ? configs : [configs[0]]; // Create a list of Algolia query objects from our configs

                queries = configsToSearch.reduce(function (queries, config) {
                  var optionalFilters = [];

                  if (config.pathBias && args.path) {
                    optionalFilters.push("pathSegments:".concat(args.path));
                  }

                  if (config.platformBias && args.platforms && args.platforms.length > 0) {
                    optionalFilters.push(args.platforms.map(function (x) {
                      return "platforms:".concat(x);
                    }));
                  }

                  if (config.legacyBias) {
                    optionalFilters.push("legacy:0");
                  }

                  var newQueries = config.indexes.map(function (_ref) {
                    var indexName = _ref.indexName;
                    var obj = {
                      indexName: indexName,
                      query: sanitizedQuery,
                      params: sentry_global_search_objectSpread(sentry_global_search_objectSpread({}, defaultQueryParams), optionalFilters.length && {
                        optionalFilters: optionalFilters
                      })
                    };
                    return obj;
                  });
                  return [].concat(toConsumableArray_default()(queries), toConsumableArray_default()(newQueries));
                }, []); // Get the search results

                _context.next = 10;
                return client.search(queries);

              case 10:
                _yield$client$search = _context.sent;
                algoliaResults = _yield$client$search.results;
                // Reduce and normalize the Algolia results
                results = configsToSearch.map(function (config) {
                  // If a site has more than one index, reduce them to one array.
                  var hits = config.indexes.reduce(function (hits, index) {
                    var algoliaResult = algoliaResults.find(function (result) {
                      return result.index === index.indexName;
                    }); // if no result return early

                    if (!algoliaResult) {
                      return toConsumableArray_default()(hits);
                    } // Normalize the results into a consistent format


                    return [].concat(toConsumableArray_default()(hits), toConsumableArray_default()(algoliaResult.hits.map(index.transformer)));
                  }, []);
                  return {
                    site: config.site,
                    name: config.name,
                    hits: hits
                  };
                });
                return _context.abrupt("return", results);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x) {
        return _query2.apply(this, arguments);
      }

      return query;
    }()
  }]);

  return SentryGlobalSearch;
}();

/* harmony default export */ const sentry_global_search = (SentryGlobalSearch);
;// CONCATENATED MODULE: ./src/sentry-algolia-index-settings.ts
/**
 * These are the recommended settings for use with Sentry Algoli indexes.
 * requires an opinionated record style which can be created using
 * ./helpers/parseRecordsFromHTML
 */
var settings = {
  snippetEllipsisText: '…',
  hitsPerPage: 10,
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
  attributesToSnippet: ["text:15"],
  attributesToHighlight: ['section'],
  attributesForFaceting: ['filterOnly(pathSegments)', 'filterOnly(platforms)', 'filterOnly(legacy)'],
  distinct: 1,
  attributeForDistinct: 'section',
  attributesToRetrieve: ['text', 'title', 'section', 'url', 'anchor', 'context'],
  searchableAttributes: ['unordered(section)', 'unordered(keywords)', 'text'],
  customRanking: ['asc(sectionRank)', 'desc(position)'],
  disableTypoToleranceOnWords: ['react', 'cli'],
  advancedSyntax: true
};
/* harmony default export */ const sentry_algolia_index_settings = (settings);
// EXTERNAL MODULE: ./node_modules/crypto-browserify/index.js
var crypto_browserify = __webpack_require__(835);
;// CONCATENATED MODULE: ./src/html-to-algolia-record/lib/hash-object.ts

/**
 * Convert a value into a md5 string
 *
 * @param input The input value
 * @return The md5 sum of the input string
 */

var hashObject = function hashObject(input) {
  var string = JSON.stringify(input);
  return crypto_browserify.createHash('md5').update(string).digest('hex');
};

/* harmony default export */ const hash_object = (hashObject);
;// CONCATENATED MODULE: ./src/html-to-algolia-record/lib/get-child-text.ts
/**
 * Recursively traverse an AST, flattening each node into its child text.
 */
var getChildText = function getChildText(element) {
  return element.children.reduce(function (str, child) {
    var _newStr;

    var newStr;

    if (child.type === 'text') {
      newStr = child.data;
    } else if (child.type === 'tag') {
      newStr = getChildText(child);
    }

    newStr = (_newStr = newStr) === null || _newStr === void 0 ? void 0 : _newStr.trim();

    if (newStr) {
      str += str ? " ".concat(newStr) : newStr;
    }

    return str;
  }, '').trim();
};

/* harmony default export */ const get_child_text = (getChildText);
;// CONCATENATED MODULE: external "htmlparser2"
const external_htmlparser2_namespaceObject = require("htmlparser2");
;// CONCATENATED MODULE: external "domhandler"
const external_domhandler_namespaceObject = require("domhandler");
;// CONCATENATED MODULE: ./src/html-to-algolia-record/lib/html-to-ast.ts


/**
 * Convert an HTML string into an AST
 */

var htmlToAST = function htmlToAST(html) {
  return new Promise(function (resolve, reject) {
    var callback = function callback(error, dom) {
      if (error) {
        reject(error);
      } else {
        resolve(dom);
      }
    };

    var handler = new external_domhandler_namespaceObject.DomHandler(callback);
    var parser = new external_htmlparser2_namespaceObject.Parser(handler);
    parser.write(html);
    parser.end();
  });
};

/* harmony default export */ const html_to_ast = (htmlToAST);
;// CONCATENATED MODULE: external "css-select"
const external_css_select_namespaceObject = require("css-select");
;// CONCATENATED MODULE: ./src/html-to-algolia-record/html-to-algolia-record.ts




function html_to_algolia_record_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function html_to_algolia_record_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? html_to_algolia_record_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : html_to_algolia_record_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var INCLUDE = ['h1', 'h2', 'h3', 'p', 'li', '[data-index]'];
var EXCLUDE = ['[data-noindex]'];

var isDescendant = function isDescendant(testNode, highNode) {
  var test = testNode.parent;

  while (test) {
    if (highNode === test) return true;
    test = test.parent;
  }

  return false;
};
/**
 * Create algolia record objects from HTML. Intended for use with the rendered
 * HTML generated from Markdown, which has a reliably flat structure.  See the
 * README for further details about the strategy this uses.
 *
 * @param html The HTML string
 * @param meta Additional content to be included in the record. At a minimum
 *             must include `title` and `url`
 */


var parseRecordsFromHTML = /*#__PURE__*/function () {
  var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(html, meta, baseSelector) {
    var title, records, initialValues, dom;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            title = meta.title;
            records = []; // This object is merged into each record and is mutated to track headings
            //and relevance

            initialValues = {
              // id of the last heading seen
              anchor: '',
              // title of the page
              section: title,
              // h1 = 100, h2 = 90, h3 = 80
              // Relevance decreases as nesting increases
              sectionRank: 100,
              // Incremented for each record. Relevance decreases as position increases
              position: 0
            }; // Fetch the initial AST

            _context.next = 5;
            return html_to_ast(html);

          case 5:
            dom = _context.sent;
            if (baseSelector) dom = (0,external_css_select_namespaceObject.selectOne)(baseSelector, dom);
            dom = (0,external_css_select_namespaceObject.selectAll)("".concat(INCLUDE.join(',')), dom);
            dom = dom.filter(function (x) {
              return (0,external_css_select_namespaceObject.is)(x, ":not(".concat(EXCLUDE.map(function (x) {
                return "".concat(x, ", ").concat(x, " *");
              }).join(','), ")"));
            });
            dom.reduce(function (acc, el) {
              var isChildOfExistingElement = !!dom.find(function (x) {
                return isDescendant(el, x);
              });
              if (isChildOfExistingElement) return acc;
              var text = get_child_text(el).trim(); // Update the context when we get a heading.

              if (/h[1-3]/.test(el.name)) {
                var level = parseInt(el.name[1], 10);
                acc.anchor = el.attribs.id;
                acc.section = text;
                acc.sectionRank = 100 * (1 - 0.1 * (level - 1)); // We don't want to create records for titles, we just want the data, so
                // we'll return here.

                return acc;
              } // Keep track of where in the doc this is. Lower stuff is less important


              acc.position++;

              var record = html_to_algolia_record_objectSpread(html_to_algolia_record_objectSpread({
                text: text
              }, meta), acc);

              records.push(html_to_algolia_record_objectSpread({
                objectID: hash_object(record)
              }, record));
              return acc;
            }, initialValues);
            return _context.abrupt("return", records);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function parseRecordsFromHTML(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ const html_to_algolia_record = (parseRecordsFromHTML);
;// CONCATENATED MODULE: ./src/sentry-global-search/lib/standard-sdk-slug.ts
// SDK slugs must follow the format entity.ecosystem[.flavor]¹. This provides a
// handy way to map non-standard formatted slugs into the ones expected by the
// platform result ranker. Values are matched in a case-insensitive manner.
//
// Left side is the slug matched, right side is the preferred slug.
//
// ¹ https://develop.sentry.dev/sdk/event-payloads/types/#clientsdkinfo
// ² https://docs.google.com/spreadsheets/d/15zpY36yMaLcsZoYDzoiHmTAkK-xPSRYuw25TZ6vsii4/
var names = {
  'sentry.rust': 'Rust',
  'sentry.ruby': 'Ruby',
  'sentry.react-native': 'React Native',
  'sentry.python': 'Python',
  'sentry.php': 'PHP',
  'sentry.perl': 'Perl',
  'sentry.node': 'Node',
  'sentry.native': 'Native',
  'sentry.javascript': 'JavaScript',
  'sentry.java': 'Java',
  'sentry.go': 'Go',
  'sentry.flutter': 'Flutter',
  'sentry.elixir': 'Elixir',
  'sentry.dotnet': '.Net',
  'sentry.cocoa': 'Cocoa',
  'sentry.android': 'Android'
};
var synonyms = {
  rust: 'sentry.rust',
  ruby: 'sentry.ruby',
  'react-native': 'sentry.react-native',
  python: 'sentry.python',
  php: 'sentry.php',
  perl: 'sentry.perl',
  node: 'sentry.node',
  "native": 'sentry.native',
  javascript: 'sentry.javascript',
  java: 'sentry.java',
  go: 'sentry.go',
  flutter: 'sentry.flutter',
  elixir: 'sentry.elixir',
  dotnet: 'sentry.dotnet',
  cocoa: 'sentry.cocoa',
  android: 'sentry.android'
};

var standardSDKSlug = function standardSDKSlug(slug) {
  var _synonyms$slug$toLowe, _names$standardSlug;

  if (typeof slug !== 'string') return;
  var validSlugs = Object.values(synonyms);
  var isValidSlug = validSlugs.indexOf(slug) >= 0;
  var standardSlug = isValidSlug ? slug : (_synonyms$slug$toLowe = synonyms[slug.toLowerCase()]) !== null && _synonyms$slug$toLowe !== void 0 ? _synonyms$slug$toLowe : slug;
  var name = (_names$standardSlug = names[standardSlug]) !== null && _names$standardSlug !== void 0 ? _names$standardSlug : standardSlug.charAt(0).toUpperCase() + standardSlug.slice(1);
  return {
    slug: standardSlug,
    name: name
  };
};

/* harmony default export */ const standard_sdk_slug = (standardSDKSlug);
;// CONCATENATED MODULE: ./src/sentry-global-search/lib/extrapolate.ts
var extrapolate = function extrapolate(str, separator) {
  var segments = str.split(separator).filter(Boolean);
  var fragments = segments.map(function (_segment, i, array) {
    return array.slice(0, i + 1).join(separator);
  });
  return fragments;
};

/* harmony default export */ const lib_extrapolate = (extrapolate);
;// CONCATENATED MODULE: ./src/index.ts






})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map