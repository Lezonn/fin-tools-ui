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

export async function safeGet(request) {
  try {
    const data = await get(request)
    return [data, null]
  } catch (err) {
    return [null, err]
  }
}

export async function safePost(request) {
  try {
    const data = await post(request)
    return [data, null]
  } catch (err) {
    return [null, err]
  }
}

export async function safePut(request) {
  try {
    const data = await put(request)
    return [data, null]
  } catch (err) {
    return [null, err]
  }
}

export async function safeDel(request) {
  try {
    const data = await del(request)
    return [data, null]
  } catch (err) {
    return [null, err]
  }
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
  del,
  safeGet,
  safePost,
  safePut,
  safeDel
}
