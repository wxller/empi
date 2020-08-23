import request from './request'
import { BASE_URL } from './baseUrl'

export function fetchInteractionTable({ month, year }) {
  return request(`${BASE_URL}/service/list?year=${year}&month=${month}`, 'post')
}

export function fetchInteractionLineData(year) {
  year = year || new Date().getFullYear()
  return request(`${BASE_URL}/service/sum?year=${year}`, 'post')
}
