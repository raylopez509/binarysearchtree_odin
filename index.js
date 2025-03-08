class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    root = buildTree(array);
  }

  buildTree(array) {
    n
    return 
  }
}

function merge(arr1, arr2) {
  let sortedArr = [];
  let i = 0;
  let j = 0;
  while(i < arr1.length || j < arr2.length) {
    if(arr1[i] <= arr2[j] || j === arr2.length) {
      sortedArr.push(arr1[i]);
      i++;
    }
    else if (arr1[i] > arr2[j] || i === arr1.length) {
      sortedArr.push(arr2[j]);
      j++;
    }
  }
  return sortedArr;
}

function mergeSort(array) {
  if(array.length === 1) {
    return array;
  }
  else {
    let splitIndex = Math.floor(array.length / 2);
    let splitArrayLeft = array.slice(0, splitIndex);
    let splitArrayRight = array.slice(splitIndex, array.length);
    return merge(mergeSort(splitArrayLeft), mergeSort(splitArrayRight));
  }
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
console.log(mergeSort(arr));
console.log(mergeSort(removeDuplicates(arr)));

function removeDuplicates(array) {
  const uniqueArray = [];
  array.forEach(element => {
    if(!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });
  return uniqueArray;
}

