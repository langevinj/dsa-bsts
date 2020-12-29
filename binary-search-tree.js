class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    //if the tree doesn't have a root, set the newNode as the root
    if(this.root === null){
      this.root = newNode;
      return this;
    }

    let curr = this.root;
    let parent;

    while(curr) {
      parent = curr;
      newNode.val < curr.val ? curr = curr.left : curr = curr.right;
    }

    newNode.val < parent.val ? parent.left = newNode : parent.right = newNode
    return this
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let newNode = new Node(val);

    function _insertHelper(node, curr=null) {
      if(node !== null) curr = node
      if(node === null) return curr
      if(node.left === null && node.right === null) return curr;

      let parent = newNode.val < node.val ? _insertHelper(node.left, curr) : _insertHelper(node.right, curr);

      return parent;
    }

    if (this.root === null) {
      this.root = newNode;
    } else {
      let p = _insertHelper(this.root)
      p.val > newNode.val ? p.left = newNode : p.right = newNode;
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while(current) {
      if(current.val === val) return current;

      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if(this.root === null) return undefined;

    function _findHelper(node){
      //base cases
      if(node === null) return undefined;
      if(node.val === val) return node;

      return val < node.val ? _findHelper(node.left) : _findHelper(node.right);
    }

    return _findHelper(this.root)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let vals = []

    function traverse(node){
      vals.push(node.val)
      if(node.left) traverse(node.left)
      if(node.right) traverse(node.right)
    }

    traverse(this.root)
    return vals
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let vals = []

    function traverse(node){
      if(node.left) traverse(node.left)
      vals.push(node.val);
      if(node.right) traverse(node.right)
    }

    traverse(this.root)
    return vals
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let vals = []

    function traverse(node) {
      if(node.left) traverse(node.left)
      if(node.right) traverse (node.right)
      vals.push(node.val)
    }

    traverse(this.root)
    return vals
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let toVisitQueue = [this.root];
    let vals =[];

    while(toVisitQueue.length) {
      let current = toVisitQueue.shift();
      vals.push(current.val)
      if(current.left) toVisitQueue.push(current.left)
      if(current.right) toVisitQueue.push(current.right)
    }

    return vals;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    //get the soughtnode by value, and thus also its children
    let soughtNode = this.find(val);

    //find the parent node of the sought value
    function _findParent(node) {
      if(node.left === soughtNode || node.right === soughtNode) return node;

      return soughtNode.val < node.val ? _findParent(node.left) : _findParent(node.right)
    }

    //adjust the children of the parent to account for node removal
    function _removeHelper(parent, soughtNode) {

      //if the node has no children
      if(!soughtNode.left && !soughtNode.right){
        parent.left === soughtNode ? parent.left = null : parent.right = null;
      } else if (soughtNode.left && soughtNode.right) {
        //handle if node being removed has two children
        console.log(parent)
        if (parent.left === soughtNode) {
          parent.left.val = soughtNode.right.val
          parent.left.right = null;
        } else {
          parent.right.val = soughtNode.right.val
          parent.right.right = null;
        }
      } else {
        //handle if node being removed has one child
        parent.left === soughtNode ? parent.left = soughtNode.left || soughtNode.right : parent.right = soughtNode.left || soughtNode.right
      }
    }

    let parent = _findParent(this.root)
    _removeHelper(parent, soughtNode)
    console.log(parent)
    return soughtNode
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    let vals = []
    
    function _balancedHelper(node){
      if(node === null) return vals
      if (node.left) _balancedHelper(node.left)
      vals.push(node.val);
      if (node.right) _balancedHelper(node.right)
      return vals
    }

    const valsLeft = _balancedHelper(this.root.left)
    vals = []
    const valsRight = _balancedHelper(this.root.right)
    if(valsRight.length + 1 === valsLeft.length || valsRight.length - 1 === valsLeft.length || valsRight.length === valsLeft.length) return true 

    return false
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
