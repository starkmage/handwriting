const input = [
  "/root/path_a/1.txt",
  "/root/path_b/3.txt",
  "/root1/4.txt",
  "/root/path_a/2.txt"
]

/* 
期望打印形式：
- root
  - path_a
    - 1.txt
    - 2.txt
  - path_b
    - 3.txt
- root1
  - 4.txt
*/

// 构建树结构
function buildTree(paths) {
  const root = {};

  for (const path of paths) {
    const parts = path.split('/').filter(Boolean); // 去除空元素
    let current = root;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }

  return root;
}

// 打印树结构
function printTree(node, indent = '') {
  const keys = Object.keys(node).sort(); // 可选：按名称排序
  for (const key of keys) {
    console.log(indent + '- ' + key);
    printTree(node[key], indent + '  ');
  }
}

const tree = buildTree(input);

console.log(tree);

printTree(tree);
