const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root
  }

  add(data ) {
    let newNode = new Node(data);
    if (!this._root) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;
    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      } else {
        return;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let currentNode = this._root;
    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else {
        if (data < currentNode.data) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return null;
  }

  remove(data) {
    let currentNode = this._root
    
    let removeNode = (node, data) => {
      if (!node) return null;
    
      if (data < node.data) {
        node.left  = removeNode(node.left, data)
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node;

      } else {
        if (!node.left && !node.right ) {
          return null

        }
        if (!node.left) {
          return node.right
        }
        if (!node.right) {
          return node.left
        }

        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
      
        node.data = minNode.data
        node.right = removeNode(node.right, minNode.data)
        return node;
      }
    }
    this._root = removeNode(currentNode, data);

  }

  min() {
    let currentNode = this._root
    if (!currentNode) return null
    while (currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.data
  }

  max() {
    let currentNode = this._root
    if (!currentNode) return null

    while (currentNode.right) {
      currentNode = currentNode.right
    }
    return currentNode.data
  }
}

module.exports = {
  BinarySearchTree
};