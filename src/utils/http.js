import axios from 'axios'

export function get({ url, queryParams, headers }) {
  return axios
    .get(url, {
      headers: getHeaders(headers),
      params: queryParams
    })
    .then(responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function post({ url, queryParams, headers, body }) {
  return axios
    .post(url, {
      headers: getHeaders(headers),
      data: body,
      params: queryParams
    })
    .then(responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function put({ url, queryParams, headers, body }) {
  return axios
    .put(url, {
      headers: getHeaders(headers),
      body: body,
      params: queryParams
    })
    .then(responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function del({ url, queryParams, headers }) {
  return axios
    .delete(url, {
      headers: getHeaders(headers),
      params: queryParams
    })
    .then(responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

function getHeaders(headers) {
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
