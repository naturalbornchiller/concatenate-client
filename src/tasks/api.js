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

export const taskPost = ({ user, name }) => (
  fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${user.token}`,
      'data': {
        'task': {
          name
        }
      }
    }
  })
)