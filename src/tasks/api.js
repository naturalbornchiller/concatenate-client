const apiUrl = 'http://localhost:4741'

export const taskIndex = user => (
  fetch(`${apiUrl}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${user.token}`
    }
  })
)