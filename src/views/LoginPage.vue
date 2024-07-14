<script setup>
import { googleAuthCodeLogin } from 'vue3-google-login'
import { api } from '@/config'
import { safeGet } from '@/utils/http'

const login = async () => {
  const authResponse = await googleAuthCodeLogin()
  const [callbackResponse, err] = await safeGet({
    url: api.oauthGoogle.callback,
    queryParams: {
      code: authResponse.code
    }
  })

  if (err) {
    console.error('Error fetching data: ' + err)
    return
  }

  console.log(callbackResponse)
}
</script>

<template>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>
