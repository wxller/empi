import axios from 'axios'

export default async function request(url, method = 'get', data = undefined, options = {}) {
  const defaultOptions = {
    url,
    method,
    data,
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method.toUpperCase === 'POST' || newOptions.method.toUpperCase() === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.header = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.header,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.header = {
        Accept: 'application/json',
        ...newOptions.header,
      }
    }
  }

  return new Promise(function(resolve, reject) {
    // 发起请求，返回结果，捕获错误
    axios(newOptions)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
