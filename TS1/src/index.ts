class TreeNode<T>{
  private _value: T;
  private _left: TreeNode<T> | null;
  private _right: TreeNode<T> | null;

  constructor(value: T, left: TreeNode<T> | null, right: TreeNode<T> | null) {
    this._value = value;
    this._left = left;
    this._right = right;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  get left(): TreeNode<T> | null {
    return this._left;
  }

  set left(value: TreeNode<T> | null) {
    this._left = value;
  }

  get right(): TreeNode<T> | null {
    return this._right;
  }

  set right(value: TreeNode<T> | null) {
    this._right = value;
  }
}

class Tree<T> {

  private _root: TreeNode<T> | null;

  constructor() {
    this._root = null;
  }

  get root(): TreeNode<T> | null {
    return this._root;
  }

  set root(value: TreeNode<T> | null) {
    this._root = value;
  }

  insert(value: T): TreeNode<T> | null {

    const newNode = new TreeNode<T>(value, null, null);
    if (this._root === null) {
      this._root = newNode;
      return newNode;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (newNode.value === currentNode.value) {
        return null;
      } if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return currentNode.left;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return currentNode.right;
        }
        currentNode = currentNode.right;
      }
    }
    return newNode;
  }

  search(node: TreeNode<T> | null = this._root, key: T): T | undefined {

    let searchValue;
    if (node === null) {
      return undefined;
    }

    if (node !== null) {
      if (key === node.value) {
        searchValue = node.value;
      } else {
        if (key < node.value) {
          searchValue = this.search(node.left, key);
        } else {
          searchValue = this.search(node.right, key);
        }
      }
    }
    return searchValue;
  }

  private min(node: TreeNode<T> | null = this._root): T | undefined {

    let min;

    if (node === null) {
      return min;
    }

    if (node.left !== null) {
      min = this.min(node.left);
    } else {
      min = node.value;
    }

    return min;
  }

  private max(node: TreeNode<T> | null = this._root): T | undefined {

    let max;

    if (node === null) {
      return max;
    }
    if (node.right !== null) {
      max = this.max(node.right);
    } else {
      max = node.value;
    }

    return max;
  }

  remove(node: TreeNode<T> | null = this._root, key: T): TreeNode<T> | null {

    if (node === null) {
      return null;
    }

    if (key < node.value) {
      node.left = this.remove(node.left, key);
      // return node;
    } else if (key > node.value) {
      node.right = this.remove(node.right, key);
      // return node;
    } else if (node.right !== null) {
      node.value = <T><unknown> this.min(node.right);
      node.right = this.remove(node.right, node.value);
    } else if (node.left !== null) {
      node.value = <T><unknown> this.max(node.left);
      node.left = this.remove(node.left, node.value);
    } else {
      // if (node.left === null && node.right === null) {
      if (node === this._root && node?.value === key) {
        this._root = null;
        node = null;
      }
      node = null;
    }
    return node;
  }

  private show(searchValue: T | undefined = undefined, node: TreeNode<T> | null = this._root, position: string | null = "root", firstValueFlag: number = 0): string {

    if (!node) {
      return "";
    }
    let li = "";
    let ul;
    if (node.value !== null) {
      if ((node.value === searchValue) && (firstValueFlag === 0)) {
        li += "<div class = 'value searchValue'>" + position + ": " + node.value + "</div>";
        firstValueFlag = 0;
      } else {
        li += "<div class = 'value'>" + position + ": " + node.value + "</div>";
      }

      if (node.right !== null) {
        li += "<div class = 'knot knot__right'>" + this.show(searchValue, node.right, "right", firstValueFlag) + "</div>";
      }

      if (node.left !== null) {
        li += "<div class = 'knot knot__left'>" + this.show(searchValue, node.left, "left", firstValueFlag) + "</div>";
      }
    }
    if (li) {
      ul = li;
    }
    return ul ?? "";
  }

  createTreeTable(value: T | undefined = undefined): void {
    const container = document.querySelector(".container");
    if (container !== null) {
      container.innerHTML = <string> this.show(value);
    }
  }
}

class WebTree {
  public insert: HTMLElement | null;
  public remove: HTMLElement | null;
  public search: HTMLElement | null;
  private tree = new Tree();

  constructor() {
    this.insert = document.querySelector(".button__add");
    this.remove = document.querySelector(".button__remove");
    this.search = document.querySelector(".button__search");
  }

  trackingClick(): void {
    if (this.insert !== null) {
      this.insert.onclick = (): void => {
        const data = <HTMLInputElement>document.getElementById("input");

        if (data !== null) {
          const value = data.valueAsNumber;
          this.tree.insert(value);
          this.tree.createTreeTable();
        }
      };
    }
    if (this.remove !== null) {
      this.remove.onclick = (): void => {
        const data = <HTMLInputElement>document.getElementById("input");

        if (data !== null) {
          const value = data.valueAsNumber;
          this.tree.remove(this.tree.root, value);
          this.tree.createTreeTable();
        }
      };
    }
    if (this.search !== null) {
      this.search.onclick = (): void => {
        const data = <HTMLInputElement>document.getElementById("input");

        if (data !== null) {
          const value = data.valueAsNumber;
          const searchValue = this.tree.search(this.tree.root, value);
          if (searchValue === undefined) {
            console.log("Узла с данным значением не найдено");
          }
          this.tree.createTreeTable(value);
        }
      };
    }
  }
}

const webTree = new WebTree();
webTree.trackingClick();
