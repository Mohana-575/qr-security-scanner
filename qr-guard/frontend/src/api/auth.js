import apiClient from './client.js'

export async function registerUser(payload) {
  const { data } = await apiClient.post('/auth/register', payload)
  return data
}

export async function loginUser(payload) {
  const { data } = await apiClient.post('/auth/login', payload)
  return data
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me')
  return data
}
