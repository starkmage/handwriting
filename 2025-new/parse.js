// 力扣2759

var jsonParse = function (str) {
  let i = 0

  const dfs = () => {
    // null
    if (str[i] === 'n') {
      i += 4

      return null
    }

    if (str[i] === 't') {
      i += 4

      return true
    }

    if (str[i] === 'f') {
      i += 5

      return false
    }

    // string
    if (str[i] === '\"') {
      let res = ''
      i++

      while (str[i] !== '\"') {
        res += str[i]
        i++
      }
      i++

      return res
    }


    // array
    if (str[i] === '[') {
      const res = []
      i++

      while (str[i] !== ']') {
        res.push(dfs())
        if (str[i] === ',') {
          i++
        }
      }

      i++

      return res
    }

    // object
    if (str[i] === '{') {
      const res = {}
      i++
      while (str[i] !== '}') {
        const key = dfs()
        // skip :
        i++
        const value = dfs()
        res[key] = value
        if (str[i] === ',') {
          i++
        }
      }

      i++

      return res
    }

    // number
    let res = ''
    while (i < str.length) {
      if (str[i] >= '0' && str[i] <= '9' || (str[i] === '-') || str[i] === '.') {
        res += str[i]
      } else {
        break
      }

      i++
    }

    return Number(res)
  }

  return dfs()
};