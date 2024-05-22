<script setup>
import config from '@/config'
import { googleAuthCodeLogin } from 'vue3-google-login'
import { getDataViaApi } from '@/utils/http-api'

const login = () => {
  googleAuthCodeLogin().then((response) => {
    getDataViaApi({
      url: config.api.oauthGoogle.callback,
      queryParams: {
        code: response.code
      }
    }).then((res) => {
      console.log(res)
    })
  })
}
</script>

<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>
