import apiUrl from '../../apiConfig'

export const getTasks = user => (
  fetch(`${apiUrl}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
)