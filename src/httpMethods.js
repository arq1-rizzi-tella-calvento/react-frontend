const BACKEND_URL = process.env.REACT_APP_API_URL

const parseJSON = (response) => {
  return Promise.resolve(response.json())
}

const checkStatus = (response) => {
  if (response.ok) {
    return response
  }

  return response.json().then(err => { throw err })
}

// 'delete' is a reserved keyword
const destroy = (path, token) => {
  return request(path, { method: 'DELETE', token })
}

const put = (path, body) => {
  return request(path, { method: 'PUT', body: JSON.stringify(body) })
}

const post = (path, body) => {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

const get = (path) => {
  return request(path, { method: 'GET' })
}

const request = (path, { method, body }) => {
  return fetch(
    `${BACKEND_URL}${path}`, {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    }
  )
    .then(checkStatus)
    .then(parseJSON)
}

export { get, put, post, destroy, request }
