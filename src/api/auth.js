import { api } from '@/config'
import { get } from '@/utils/http'

export default {
  login: (queryParams) => {
    return get({
      url: api.oauthGoogle.callback,
      queryParams
    })
  }
}
