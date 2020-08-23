import request from './request'
import { BASE_URL } from './baseUrl'
export function fetchShareRank() {
    return request(`${BASE_URL}/api/diagnostic/ranking`, 'get')
}

export function fetchGender() {
    return request(`${BASE_URL}/api/diagnostic/gender`, 'get')
}

export function fetchShareDocumen() {
    return request(`${BASE_URL}/api/diagnostic/shareDocumen`, 'get')
}

export function fetchShareDocumenByMonth() {
    return request(`${BASE_URL}/api/diagnostic/shareDocumenByMonth`, 'get')
}