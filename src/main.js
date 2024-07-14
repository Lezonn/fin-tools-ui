import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '640757226227-3o3ein8lr4l0v5tfu5t7hp8qfojnc9mr.apps.googleusercontent.com'
})
app.use(vuetify)

app.mount('#app')
