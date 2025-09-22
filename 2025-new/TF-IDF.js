/* 
词频 (Term Frequency - TF)
指一个给定的词语在该文件中出现的频率。这个数字通常会被归一化，以防止它偏向于长的文件。

计算公式:
TF(t, d)= 
词 t 在文件 d 中出现的次数 / 文件 d 的总词数

t (term): 某个词
d (document): 某个文件

例子: 一篇文章有100个词，"前端" 出现了3次。那么 "前端" 在这篇文章的 TF 值就是 3 / 100 = 0.03。
*/

const computeTF = (doc) => {
  const words = doc.toLowerCase().split(/\W+/).filter((val) => val !== '')
  const totalLength = words.length

  const frequency = new Map()
  for (const word of words) {
    if (frequency.has(word)) {
      frequency.set(word, frequency.get(word) + 1)
    } else {
      frequency.set(word, 1)
    }
  }

  const output = new Map()
  for (const [word, count] of frequency.entries()) {
    output.set(word, count / totalLength)
  }

  return output
}

/* 
逆文档频率 (Inverse Document Frequency - IDF)
衡量一个词的普遍重要性。如果一个词在很多文件中都出现了，那么它的 IDF 值会很低，说明这个词的区分度不高（例如 "的"、"是"、"a"、"the" 等）。

计算公式:

IDF(t, D)=log( 
文档总数 D / (包含词 t 的文档数+1)
 )

t (term): 某个词
D (Documents): 文档总集

分母 +1 是为了避免分母为零（即某个词在所有文档中都未出现）的情况，这是一种平滑（smoothing）处理。

log 是为了平滑结果，使得 IDF 值的差距不会过大。
*/

const computeIDF = (docs) => {
  const docCount = docs.length

  const frequency = new Map()

  for (const doc of docs) {
    const words = new Set(doc.toLowerCase().split(/\W+/).filter((val) => val !== ''))

    for (const word of words) {
      if (frequency.has(word)) {
        frequency.set(word, frequency.get(word) + 1)
      } else {
        frequency.set(word, 1)
      }
    }
  }

  const output = new Map()

  for (const [word, count] of frequency.entries()) {
    output.set(word, Math.log(docCount / (count + 1)))
  }

  return output
}


/* 
 TF-IDF
将 TF 和 IDF 相乘，就得到了一个词在某一文件中的 TF-IDF 权重。

计算公式:

TF-IDF(t, d, D)=TF(t, d)×IDF(t, D)
这个值越高，说明这个词在这篇文章中的重要性越大。
*/

const computeTFIDF = (docs) => {
  const IDF = computeIDF(docs)

  return docs.map((doc) => {
    const TF = computeTF(doc)

    const res = {}

    for (const word of TF.keys()) {
      res[word] = TF.get(word) * IDF.get(word)
    }

    return res
  })
}

// 示例
const docs = [
  "React makes it painless to create interactive UIs",
  "Vue is a progressive framework for building UIs",
  "Angular is a platform for building mobile and desktop web applications"
];

const res = computeTFIDF(docs)
console.log(res)
