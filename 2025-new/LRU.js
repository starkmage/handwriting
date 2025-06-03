class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error('Capacity must > 0')
    }
    this.capacity = capacity
    this.cache = {}
    this.size = 0

    this.head = new ListNode()
    this.tail = new ListNode()
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  addToHead(node) {
    node.prev = this.head
    node.next = this.head.next
    this.head.next.prev = node
    this.head.next = node
  }

  removeFromList(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  moveToHead(node) {
    this.removeFromList(node)
    this.addToHead(node)
  }

  popTail() {
    if (this.size === 0) {
      return
    }

    const lastNode = this.tail.prev
    this.removeFromList(lastNode)
    const key = lastNode.key
    delete this.cache[key]
    this.size--

    return lastNode
  }

  set(key, value) {
    if (this.cache[key]) {
      const node = this.cache[key]
      node.value = value
      this.moveToHead(node)

      return
    }

    if (this.size === this.capacity) {
      this.popTail()
    }

    const newNode = new ListNode(key, value)
    this.addToHead(newNode)
    this.cache[key] = newNode
    this.size++
  }

  get(key) {
    if (!this.cache[key]) {
      return null
    }

    const node = this.cache[key]
    this.moveToHead(node)

    return node.value
  }
}