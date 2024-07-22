import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const googleClientId = {
  clientId: '640757226227-3o3ein8lr4l0v5tfu5t7hp8qfojnc9mr.apps.googleusercontent.com'
}
const vuetify = createVuetify({
  components,
  directives
})

axios.defaults.withCredentials = true

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, googleClientId)
app.use(vuetify)

app.mount('#app')
