'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _createVNode = require('./createVNode');

var _createVNode2 = _interopRequireDefault(_createVNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Kirill Shestakov 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://github.com/guitarino/sync-with--react/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function findRefNode(ref) {
  return ref instanceof Node ? ref : (0, _reactDom.findDOMNode)(ref);
};

var mutationConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
};

var Sync = function (_Component) {
  _inherits(Sync, _Component);

  function Sync() {
    _classCallCheck(this, Sync);

    return _possibleConstructorReturn(this, (Sync.__proto__ || Object.getPrototypeOf(Sync)).apply(this, arguments));
  }

  _createClass(Sync, [{
    key: 'render',
    value: function render() {
      return this.syncRef ? (0, _createVNode2.default)(findRefNode(this.syncRef)) : null;
    }

    /**
     * Synchronizes the Sync component with provided reference
     * @param {(Component|Node)} ref - the reference for synchronization
     */

  }, {
    key: 'syncWith',
    value: function syncWith(ref) {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
      if (ref) {
        var node = findRefNode(ref);
        if (node) {
          this.mutationObserver = new MutationObserver(this.handleRefUpdate);
          this.mutationObserver.observe(node, mutationConfig);
        }
      }
      this.syncRef = ref;
      this.handleRefUpdate();
    }
  }, {
    key: 'handleRefUpdate',
    value: function handleRefUpdate() {
      this.forceUpdate();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleRefUpdate = this.handleRefUpdate.bind(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.syncWith(null);
    }
  }]);

  return Sync;
}(_react.Component);

/**
 * A utility to simplify creating reference callbacks.
 * You need to have references to both your reference component and
 * a Sync component. Whenever Sync component is available,
 * it will get synchronized with your reference component.
 * @returns {Object} - an object {ref, syncRef} containing new connected ref callbacks 
 */


exports.default = Sync;
Sync.createRefCallbacks = function () {
  var _ref,
      _syncRef,
      checkRefs = function checkRefs() {
    if (_syncRef) {
      _syncRef.syncWith(_ref);
    }
  };
  return {
    ref: function ref(result) {
      _ref = result;
      checkRefs();
    },
    syncRef: function syncRef(result) {
      _syncRef = result;
      checkRefs();
    }
  };
};
//# sourceMappingURL=sync-with.js.map