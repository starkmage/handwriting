class PriorityHeap {
  constructor(compareFn) {
    this.heap = []
    // 默认小顶堆
    this.compare = compareFn ?? ((a, b) => a - b)
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  getParentValue(childIndex) {
    return this.heap[this.getParentIndex(childIndex)]
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length
  }

  getLeftChildValue(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)]
  }

  getRightChildValue(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)]
  }

  swap(indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]]
  }


  heapifyUp() {
    let index = this.heap.length - 1
    while (this.hasParent(index) && this.compare(this.heap[index], this.getParentValue(index)) < 0) {
      this.swap(index, this.getParentIndex(index))
      index = this.getParentIndex(index)
    }
  }

  heapifyDown() {
    let index = 0
    while (this.hasLeftChild(index)) {
      let smallerIndex = this.getLeftChildIndex(index)
      if (this.hasRightChild(index) && this.compare(this.getRightChildValue(index), this.getLeftChildValue(index)) < 0) {
        smallerIndex = this.getRightChildIndex(index)
      }

      if (this.compare(this.heap[smallerIndex], this.heap[index]) < 0) {
        this.swap(smallerIndex, index)
        index = smallerIndex
      } else {
        break
      }
    }
  }

  enqueue(item) {
    this.heap.push(item)
    this.heapifyUp()
  }

  dequeue() {
    if (this.heap.length === 0) {
      return
    }

    const result = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()

    if (this.heap.length > 1) {
      this.heapifyDown()
    }
    
    return result
  }
}