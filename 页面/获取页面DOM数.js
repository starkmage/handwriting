function find() {
  const map = {}
  let list = document.querySelectorAll('*')
  for (let dom of list) {
    let tag = dom.nodeName.toLowerCase()
    map[tag] ? map[tag]++ : map[tag] = 1
  }
  return map
}