export function getRequestData(request, config = { cache: false }) {
  let { cache } = config
  let cachedPayload = null

  return async function parsed(...args) {
    if (cache && cachedPayload) {
      return cachedPayload
    }
    try {
      const res = await request.apply(this, args)
      if (res && res.data && res.data.status === 200 && res.data.payload) {
        cachedPayload = res.data.payload
        return res.data.payload
      } else {
        console.log(`请求 ${request.name} 出错，错误码：`, res.data.status || '未知错误码')
        return null
      }
    } catch (error) {
      console.log(`request-${request.name}出错:`, error)
    }
  }
}
