/**
 * @license MIT
 * @copyright Kirill Shestakov 2017
 * @see https://github.com/guitarino/sync-with--react/
 */

import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import createVNode from './createVNode';

function findRefNode(ref) {
  return ref instanceof Node ? ref : findDOMNode(ref);
};

var mutationConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
};

export default class Sync extends Component {
  render() {
    return (
      this.syncRef ? createVNode(findRefNode(this.syncRef)) : null
    );
  }

  syncWith(ref) {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (ref) {
      let node = findRefNode(ref);
      if (node) {
        this.mutationObserver = new MutationObserver(this.handleRefUpdate);
        this.mutationObserver.observe(
          node,
          mutationConfig
        );
      }
    }
    this.syncRef = ref;
    this.handleRefUpdate();
  }

  handleRefUpdate() {
    this.forceUpdate();
  }

  componentWillMount() {
    this.handleRefUpdate = this.handleRefUpdate.bind(this);
  }

  componentWillUnmount() {
    this.syncWith(null);
  }
}

Sync.createRefCallbacks = function() {
  var
    ref,
    syncRef,
    checkRefs = function() {
      if (syncRef) {
        syncRef.syncWith(ref)
      }
    }
  ;
  return {
    ref: function(result) {
      ref = result;
      checkRefs();
    },
    syncRef: function(result) {
      syncRef = result;
      checkRefs();
    }
  }
};