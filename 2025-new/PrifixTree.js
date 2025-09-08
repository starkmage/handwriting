// 类似力扣208
// 支持wildcard的前缀树

class Dictionary {
  constructor() {
    this.tree = {}
  }

  add(word) {
    let node = this.tree

    for (const char of word) {
      if (!node[char]) {
        node[char] = {}
      }

      node = node[char]
    }

    node.isEnd = true
  }

  has(word) {
    const search = (node, index) => {
      if (index === word.length) {
        return node.isEnd === true
      }

      const char = word[index]

      if (char === '*') {
        for (const key in node) {
          if (key !== 'isEnd') {
            if (search(node[key], index + 1)) {
              return true
            }
          }
        }

        return false
      } else {
        if (!node[char]) {
          return false
        }

        return search(node[char], index + 1)
      }
    }

    return search(this.tree, 0)
  }
}

const dict = new Dictionary()

dict.add('cat')

console.log(dict.has('cat'))
console.log(dict.has('c*'))
console.log(dict.has('*at'))
