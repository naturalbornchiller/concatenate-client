import apiUrl from '../apiConfig'
import axios from 'axios'

export const taskIndex = user => (
  axios.get(`${apiUrl}/tasks`, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)

export const taskShow = ({ user, id }) => (
  axios.get(`${apiUrl}/tasks/${id}`, {
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

export const taskDelete = ({ user, id }) => (
  axios.delete(`${apiUrl}/tasks/${id}`, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)

export const taskPatch = ({ user, id }) => (
  axios.patch(`${apiUrl}/tasks/${id}`, {}, {
    headers: {
      'Authorization':`Bearer ${user.token}`
    }
  })
)