<script setup>
import config from '@/config'
import { googleAuthCodeLogin } from 'vue3-google-login'
import { getDataViaApi } from '@/utils/http-api'

const login = () => {
  googleAuthCodeLogin().then((response) => {
    console.log('Handle the response', response)

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
  <main>
    <center>
      <div class="section"></div>
      <div class="container">
        <div
          class="z-depth-1 grey lighten-4 row"
          style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #eee"
        >
          <form class="col s12" method="post" action="#">
            <div class="row">
              <div class="col s12"></div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input class="validate" type="email" name="email" id="email" />
                <label for="email">Enter your email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input class="validate" type="password" name="password" id="password" />
                <label for="password">Enter your password</label>
              </div>
              <label style="float: right">
                <a class="pink-text" href="#!"><b>Forgot Password?</b></a>
              </label>
            </div>

            <br />
            <div class="row">
              <button
                type="submit"
                name="btn_login"
                class="col s12 btn btn-large waves-effect indigo"
              >
                Login
              </button>
            </div>
          </form>

          <div class="row">
            <button @click="login">Login Using Google</button>
          </div>
        </div>
      </div>
      <a href="#!">Create account</a>
    </center>

    <div class="section"></div>
    <div class="section"></div>
  </main>
</template>

<style scoped>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

body {
  background: #fff;
}

.input-field input[type='date']:focus + label,
.input-field input[type='text']:focus + label,
.input-field input[type='email']:focus + label,
.input-field input[type='password']:focus + label {
  color: #e91e63;
}

.input-field input[type='date']:focus,
.input-field input[type='text']:focus,
.input-field input[type='email']:focus,
.input-field input[type='password']:focus {
  border-bottom: 2px solid #e91e63;
  box-shadow: none;
}
</style>
