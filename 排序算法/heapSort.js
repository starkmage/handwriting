const adjustHeap = (nums, i, heapSize) => {
  for (let j =  2 * i + 1; j < heapSize; j = 2 * j + 1) {
    if (j + 1 < heapSize && nums[j + 1] > nums[j]) {
      j = j + 1
    }

    if (nums[j] > nums[i]) {
      [nums[j], nums[i]] = [nums[i], nums[j]]
      i = j
    } else {
      break
    }
  }
  
}

const buildHeap = (nums) => {
  const heapSize = nums.length

  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    adjustHeap(nums, i, heapSize)
  }
}

const heapSort = (nums) => {
  buildHeap(nums)
  const n = nums.length
  
  for (let i = n - 1; i > 0; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]]
    adjustHeap(nums, 0, i)
  }
}

/*
在最大堆中，索引值0的元素（堆顶）是堆中的最大值。这正是为什么我们使用最大堆来实现从小到大排序的关键所在。

堆排序具体工作过程
构建最大堆：完成后，数组索引0处确实是最大元素

排序阶段：

将堆顶元素（最大值）与当前堆的最后一个元素交换
这样最大值就被放到了数组的末尾
堆的大小减1（最后一个元素已排好序）
重新调整剩余元素为最大堆
重复以上步骤
每一轮交换的结果：

第一轮：最大元素 → 放到数组最后一位
第二轮：次大元素 → 放到数组倒数第二位
依此类推...
这样，当所有交换完成后，最小的元素会在数组最前面，最大的元素会在数组最后面，整个数组就是按从小到大排序的。

这就是为什么最大堆可以实现升序排序的原因。
*/