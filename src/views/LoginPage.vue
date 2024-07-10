<script setup>
import { googleAuthCodeLogin } from 'vue3-google-login'
import { api } from '@/config'
import { get } from '@/utils/http-api'

const login = () => {
  googleAuthCodeLogin().then((response) => {
    get({
      url: api.oauthGoogle.callback,
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
