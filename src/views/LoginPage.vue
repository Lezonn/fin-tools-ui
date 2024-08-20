<script setup>
import { useRouter } from 'vue-router'
import { googleAuthCodeLogin } from 'vue3-google-login'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  const authResponse = await googleAuthCodeLogin()

  const queryParams = {
    code: authResponse.code
  }

  authStore.login({
    queryParams,
    success: loginSuccess,
    fail: loginFail
  })
}

const loginSuccess = () => {
  router.push({ name: 'home' })
}

const loginFail = (err) => {
  console.error('Failed to login with Google, err: ' + err)
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
