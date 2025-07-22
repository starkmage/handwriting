function diff(oldVNode, newVNode) {
  // 1. 如果标签名不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    return (node) => {
      const newNode = createElement(newVNode);
      node.parentNode.replaceChild(newNode, node);
      return newNode;
    };
  }

  // 2. 比较属性
  const patchProps = (oldProps, newProps, el) => {
    // 更新/添加新属性
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        setAttribute(el, key, newProps[key]);
      }
    }
    // 删除旧属性
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }
  };

  // 3. 比较子节点
  const patchChildren = (oldChildren, newChildren, parent) => {
    // 简单实现 - 实际应用更复杂的算法
    const maxLen = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLen; i++) {
      if (!oldChildren[i]) {
        // 新增节点
        parent.appendChild(createElement(newChildren[i]));
      } else if (!newChildren[i]) {
        // 删除节点
        parent.removeChild(oldChildren[i].el);
      } else {
        // 递归比较
        diff(oldChildren[i], newChildren[i])(oldChildren[i].el);
      }
    }
  };

  return (node) => {
    const el = node;
    patchProps(oldVNode.props, newVNode.props, el);
    patchChildren(oldVNode.children, newVNode.children, el);
    return el;
  };
}