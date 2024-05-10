import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '640757226227-3o3ein8lr4l0v5tfu5t7hp8qfojnc9mr.apps.googleusercontent.com'
})

app.mount('#app')
