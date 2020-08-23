import request from './request'
import { BASE_URL } from './baseUrl'

export function fetchEmpiTable({ month, year }) {
  return request(`${BASE_URL}/empi/list?year=${year}&month=${month}`, 'post')
}

export function fetchMatchLine(year) {
  year = year || new Date().getFullYear()
  return request(`${BASE_URL}/empi/avg?year=${year}`, 'post')
}

export function fetchSysUseTable() {
  return request(`${BASE_URL}/empi/systemInvoke`, 'post')
}


