import { createElement } from 'react';

var toLower = (value) => String(value).toLowerCase();

// Gets a style object from an element.style
function styleToObject(style) {
  var obj = {};
  for (var i=0; i<style.length; i++) {
    var item = style[i];
    obj[item] = style[item];
  }
  return obj;
}

// Gets an attribute object from an HTML element
function getAttrObject(element) {
  var attrs = element.attributes;
  var attrObject = {};
  for (var i=0; i<attrs.length; i++) {
    var attr = attrs[i];
    var attrName = toLower(attr.name);
    // React, you are annoying
    if (attrName === 'class') {
      attrName = 'className';
    }
    var attrVal;
    // Style to object
    if (attrName === 'style') {
      attrVal = styleToObject(element.style);
    }
    else {
      attrVal = attr.value;
    }
    attrObject[attrName] = attrVal;
  }
  return attrObject;
}

// Gets an array of children from element.childNodes
function getChildren(children) {
  var childArray = [];
  for (var i=0; i<children.length; i++) {
    var child = children[i];
    childArray.push(createVNode(child));
  }
  return childArray;
}

/**
 * Creates a virtual dom node from an actual dom node
 * @param {Node} node - DOM node to create a virtual node from
 */
export default function createVNode(node) {
  if (node instanceof Node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return createElement.apply(null, [
        toLower(node.tagName),
        getAttrObject(node),
      ].concat(
        getChildren(node.childNodes)
      ));
    }
    else if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
  }
  return null;
}