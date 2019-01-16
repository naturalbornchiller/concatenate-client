const apiUrl = 'http://localhost:4741'
import axios from 'axios'

export const taskIndex = user => (
  axios.get(`${apiUrl}/tasks`, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)

export const taskPost = (user, data) => (
  axios.post(`${apiUrl}/tasks`, data, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)