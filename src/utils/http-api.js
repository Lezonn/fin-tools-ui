const DEFAULT = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function _getHeaders(headers) {
  return {
    ...DEFAULT.headers,
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

const tryHandleNonJsonResponse = (error, originalResponse) => {
  const isJsonParseError = error instanceof SyntaxError
  if (!isJsonParseError) {
    throw error
  }
  const errorRes = {
    code: originalResponse.status,
    status: getHttpStatusTextFromCode(originalResponse.status)
  }
  throw errorRes
}

export function _responseAdapter(res) {
  return res
    .json()
    .then((body) => {
      const newRes = {
        ...res,
        body
      }
      if (!res.ok) {
        throw newRes.body || newRes
      }
      return newRes
    })
    .catch((e) => {
      tryHandleNonJsonResponse(e, res)
    })
}

const _emptyValues = [undefined, null, '']
export function _hasValue(value) {
  if (_emptyValues.includes(value)) {
    return false
  }
  if (Array.isArray(value)) {
    return value.filter((i) => !_emptyValues.includes(i)).length
  }
  return true
}

export function buildUrl({ url, queryParams }) {
  const isFullUrl = url.indexOf('http') === 0
  const urlObj = new URL((isFullUrl ? '' : document.location.origin) + url)
  const searchParams = urlObj.searchParams
  Object.entries(queryParams || {})
    .filter(([_, value]) => _hasValue(value))
    .forEach(([key, value]) => {
      const values = Array.isArray(value) ? value : [value]
      values.forEach((i) => searchParams.append(key, i))
    })
  return urlObj
}

export function get({ url, queryParams, headers }) {
  const urlObj = buildUrl({
    url,
    queryParams
  })
  return fetch(urlObj, {
    method: 'GET',
    headers: _getHeaders(headers)
  })
    .then(_responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function post({ url, queryParams, headers, body }) {
  const urlObj = buildUrl({
    url,
    queryParams
  })
  return fetch(urlObj, {
    method: 'POST',
    headers: _getHeaders(headers),
    body: JSON.stringify(body)
  })
    .then(_responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function put({ url, queryParams, headers, body }) {
  const urlObj = buildUrl({
    url,
    queryParams
  })
  return fetch(urlObj, {
    method: 'PUT',
    headers: _getHeaders(headers),
    body: JSON.stringify(body)
  })
    .then(_responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

export function del({ url, queryParams, headers }) {
  const urlObj = buildUrl({
    url,
    queryParams
  })
  return fetch(urlObj, {
    method: 'DELETE',
    headers: _getHeaders(headers)
  })
    .then(_responseAdapter)
    .catch((err) => {
      defaultHandlerConnectionError(err)
      throw err
    })
}

function getHttpStatusTextFromCode(code) {
  try {
    return status(code)
  } catch (ignore) {
    return `Undefined Status Code : ${code}`
  }
}

export default {
  get,
  post,
  put,
  del
}
