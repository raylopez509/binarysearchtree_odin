class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    function createBSTRecur(array, start, end) {
      if (start > end) {
        return null;
      }
      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);
      root.left = createBSTRecur(array, start, mid - 1);
      root.right = createBSTRecur(array, mid + 1, end);
      return root;
    }

    function createBST(array) {
      return createBSTRecur(array, 0, array.length - 1);
    }

    let sortedArr = mergeSort(removeDuplicates(array));

    return createBST(sortedArr);
  }

  insert(value) {
    let node = this.root;
    let foundEnd = false;
    while (!foundEnd) {
      if (value < node.value) {
        if (node.left === null) {
          foundEnd = true;
          let newNode = new Node(value);
          node.left = newNode;
        } else {
          node = node.left;
        }
      } else {
        if (node.right === null) {
          foundEnd = true;
          let newNode = new Node(value);
          node.right = newNode;
        } else {
          node = node.right;
        }
      }
    }
  }

  deleteItem(value) {
    let parentNode = null;
    let node = this.root;
    let foundNode = false;
    while (!foundNode) {
      if (value < node.value) {
        parentNode = node;
        node = node.left;
      } else if (value > node.value) {
        parentNode = node;
        node = node.right;
      } else {
        foundNode = true;
        if (node.left == null && node.right == null) {
          if (value < parentNode.value) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        } else if (node.left == null || node.right == null) {
          if (node.left == null) {
            if (value < parentNode.value) {
              parentNode.left = node.right;
            } else {
              parentNode.right = node.right;
            }
          } else {
            if (value < parentNode.value) {
              parentNode.left = node.left;
            } else {
              parentNode.right = node.left;
            }
          }
        } else {
          let successor = node.right;
          while (successor.left != null) {
            successor = successor.left;
          }
          let successorValue = successor.value;
          this.deleteItem(successorValue);
          node.value = successorValue;
        }
      }
    }
  }

  find(value) {
    let node = this.root;
    while (node !== null) {
      if (value === node.value) {
        return node;
      } else if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }
    if (this.root === null) {
      return;
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length != 0) {
      let currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback) {
    function inOrderRecursion(node, callback) {
      if (node.left != null) {
        inOrderRecursion(node.left, callback);
      }
      callback(node);
      if (node.right != null) {
        inOrderRecursion(node.right, callback);
      }
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    inOrderRecursion(this.root, callback);
  }

  preOrder(callback) {
    function inOrderRecursion(node, callback) {
      callback(node);
      if (node.left != null) {
        inOrderRecursion(node.left, callback);
      }
      if (node.right != null) {
        inOrderRecursion(node.right, callback);
      }
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    inOrderRecursion(this.root, callback);
  }

  postOrder(callback) {
    function inOrderRecursion(node, callback) {
      if (node.left != null) {
        inOrderRecursion(node.left, callback);
      }
      if (node.right != null) {
        inOrderRecursion(node.right, callback);
      }
      callback(node);
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    inOrderRecursion(this.root, callback);
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let depth = 0;
    let currentNode = this.root;
    while (currentNode !== null) {
      if (node.value === currentNode.value) {
        return depth;
      } else if (node.value < currentNode.value) {
        depth++;
        currentNode = currentNode.left;
      } else {
        depth++;
        currentNode = currentNode.right;
      }
    }
    return null;
  }
}

function merge(arr1, arr2) {
  let sortedArr = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] <= arr2[j] || j === arr2.length) {
      sortedArr.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j] || i === arr1.length) {
      sortedArr.push(arr2[j]);
      j++;
    }
  }
  return sortedArr;
}

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    let splitIndex = Math.floor(array.length / 2);
    let splitArrayLeft = array.slice(0, splitIndex);
    let splitArrayRight = array.slice(splitIndex, array.length);
    return merge(mergeSort(splitArrayLeft), mergeSort(splitArrayRight));
  }
}

function removeDuplicates(array) {
  const uniqueArray = [];
  array.forEach((element) => {
    if (!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });
  return uniqueArray;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function printCallback(node) {
  console.log(node.value);
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(arr);
// bst.insert(6);
// bst.insert(2);
// bst.deleteItem(4);
// prettyPrint(bst.root);
// console.log(bst.find(4));

// bst.levelOrder(printCallback);
// bst.postOrder(printCallback);

console.log(bst.depth(bst.find(1)));
