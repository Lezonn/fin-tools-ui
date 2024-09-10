import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
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
  components: {
    ...components,
    VDateInput,
    VNumberInput
  },
  directives
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, googleClientId)
app.use(vuetify)

app.mount('#app')
