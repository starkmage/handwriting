/**
 * 基于三分法选择基准值的快速排序
 * @param {Array} arr 待排序数组
 * @param {number} [left=0] 左边界索引
 * @param {number} [right=arr.length-1] 右边界索引
 * @returns {Array} 排序后的数组
 */
function quickSortThreeWay(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  
  // 选择基准值（这里使用三数取中法）
  const pivotIndex = getPivotIndex(arr, left, right);
  const pivot = arr[pivotIndex];
  
  // 三分区间的边界初始化
  let lt = left;      // 小于区的右边界
  let gt = right;     // 大于区的左边界
  let i = left;       // 当前元素指针
  
  while (i <= gt) {
      if (arr[i] < pivot) {
          // 当前元素小于基准值，放入小于区
          swap(arr, i, lt);
          lt++;
          i++;
      } else if (arr[i] > pivot) {
          // 当前元素大于基准值，放入大于区
          swap(arr, i, gt);
          gt--;
          // 注意这里不移动i，因为交换后的元素还未检查
      } else {
          // 当前元素等于基准值，留在等于区
          i++;
      }
  }
  
  // 递归排序小于区和大于区
  quickSortThreeWay(arr, left, lt - 1);
  quickSortThreeWay(arr, gt + 1, right);
  
  return arr;
}

/**
* 获取基准值索引（三数取中法）
* @param {Array} arr 数组
* @param {number} left 左边界
* @param {number} right 右边界
* @returns {number} 基准值索引
*/
function getPivotIndex(arr, left, right) {
  const mid = Math.floor((left + right) / 2);
  
  // 找出左、中、右三个元素的中值
  if (arr[left] > arr[mid]) {
      swap(arr, left, mid);
  }
  if (arr[left] > arr[right]) {
      swap(arr, left, right);
  }
  if (arr[mid] > arr[right]) {
      swap(arr, mid, right);
  }
  
  // 将中值放在right-1位置，作为基准值
  swap(arr, mid, right - 1);
  return right - 1;
}

/**
* 交换数组中的两个元素
* @param {Array} arr 数组
* @param {number} i 索引1
* @param {number} j 索引2
*/
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 使用示例
const array = [3, 7, 8, 5, 2, 1, 9, 5, 4];
console.log('排序前:', array);
console.log('排序后:', quickSortThreeWay(array));