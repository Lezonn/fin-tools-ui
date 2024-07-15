<script setup>
import { useRouter } from 'vue-router'
import { googleAuthCodeLogin } from 'vue3-google-login'
import { api } from '@/config'
import { safeGet } from '@/utils/http'

const router = useRouter()

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

  if (callbackResponse.data) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <v-container>
    <div class="login-form">
      <h2 class="text-center">Login</h2>
      <div class="text-center my-4">
        <button @click="login">Login Using Google</button>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.login-form {
  border: 1px solid black;
  box-shadow: 1px 1px rgb(85, 85, 85);
  height: 150px;
  width: 300px;
  margin: 10vh auto;
}
</style>
