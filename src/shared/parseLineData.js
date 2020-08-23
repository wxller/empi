export function parseLineData(src, key) {
  let month = new Date().getMonth() + 1

  let result = []
  for (let i = 1; i <= month; i++) {
    const r = src.find((m) => m.countMonth === i)
    if (r) {
      result.push(r[key])
    } else {
      result.push(0)
    }
  }

  return result
}
