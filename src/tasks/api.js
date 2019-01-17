const apiUrl = 'http://localhost:4741'
import axios from 'axios'

export const taskIndex = user => (
  axios.get(`${apiUrl}/tasks`, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)

export const taskShow = ({ user, id }) => {
  console.log(user)
  console.log(id)
  
  return (
    axios.get(`${apiUrl}/tasks/${id}`, {
      headers: {
        'Authorization':`Bearer ${user.token}`
      }
    })
  )
}

export const taskPost = (user, data) => (
  axios.post(`${apiUrl}/tasks`, data, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)