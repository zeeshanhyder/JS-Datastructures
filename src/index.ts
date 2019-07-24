class Tree {
  value: string;
}
class Trie {
  private tree: any;
  constructor() {
    this.tree = {};
  }

  private _walk(keys: string[], tree: Tree, level: number) {
    keys = keys.filter(key => key !== "value");
    for (let [idx, key] of keys.entries()) {
      console.log(
        `${"\t".repeat(level - 1)}-> ${level}.${idx + 1} ${tree[key].value}`
      );
      this._walk(Object.keys(tree[key]), tree[key], level + 1);
    }
    return;
  }

  private _walkAndInsert(tree: Tree, entry, index) {
    if (index === entry.length - 1) {
      return (tree[entry[index]] = {
        value: entry
      });
    } else {
      if (!tree[entry[index]]) {
        tree[entry[index]] = {
          value: entry.slice(0, index + 1)
        };
      }

      tree[entry[index]][entry[index + 1]] = {
        ...tree[entry[index]][entry[index + 1]],
        ...this._walkAndInsert(tree[entry[index]], entry, index + 1)
      };
    }
    return tree[entry[index]];
  }

  private _walkAndSearch(entry: string, tree: Tree, index: number) {
    if (!tree) {
      console.error("Not found!");
      return;
    }
    if (index === entry.length) {
      console.info("Found!");
      return tree.value;
    } else {
      return this._walkAndSearch(entry, tree[entry[index]], index + 1);
    }
  }

  insert(entry: string) {
    let index = 0;
    this._walkAndInsert(this.tree, entry, index);
  }

  walk(entry) {
    let res = this._walkAndSearch(entry, this.tree, 0);
    console.log(res);
  }

  walkAll() {
    console.info("Printing Hierarchy...");
    this._walk(Object.keys(this.tree), this.tree, 1);
  }
}

var sampleTrie = new Trie();
sampleTrie.insert("ex");
sampleTrie.insert("exam");
sampleTrie.insert("example");
sampleTrie.walkAll();
sampleTrie.walk("fp"); // not found
