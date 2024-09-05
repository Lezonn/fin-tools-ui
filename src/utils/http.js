import axios from 'axios'

export async function get({ url, queryParams, headers }) {
  try {
    const response = await axios.get(url, {
      headers: getHeaders(headers),
      params: queryParams
    })

    return responseAdapter(response)
  } catch (err) {
    defaultHandlerConnectionError(err)
    throw err
  }
}

export async function post({ url, queryParams, headers, body }) {
  try {
    const response = await axios.post(url, {
      headers: getHeaders(headers),
      data: body,
      params: queryParams
    })

    return responseAdapter(response)
  } catch (err) {
    defaultHandlerConnectionError(err)
    throw err
  }
}

export async function put({ url, queryParams, headers, body }) {
  try {
    const response = await axios.put(url, {
      headers: getHeaders(headers),
      body: body,
      params: queryParams
    })

    return responseAdapter(response)
  } catch (err) {
    defaultHandlerConnectionError(err)
    throw err
  }
}

export async function del({ url, queryParams, headers }) {
  try {
    const response = await axios.delete(url, {
      headers: getHeaders(headers),
      params: queryParams
    })

    return responseAdapter(response)
  } catch (err) {
    defaultHandlerConnectionError(err)
    throw err
  }
}

function getHeaders(headers) {
  const token = localStorage.getItem('jwt')
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers
    }
  }
  return {
    'Content-Type': 'application/json',
    ...headers
  }
}

export function defaultHandlerConnectionError(err) {
  switch (err.status) {
    case 401: {
      window.location.href = '/login'
      break
    }
    default:
  }
}

export function responseAdapter(response) {
  return response.data || response
}

export default {
  get,
  post,
  put,
  del
}
