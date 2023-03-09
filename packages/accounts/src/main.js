import { createUi } from '@baldeweg/ui'
import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'
import i18n from './i18n.js'
import '@baldeweg/ui/styles'
import { worker } from './mocks/browser'

const theme = () => {
  if (import.meta.env.VUE_APP_THEME === 'false') return

  document.documentElement.innerHTML +=
    '<style>@import "' + import.meta.env.VUE_APP_THEME + '";</style>'
}

theme()

if (import.meta.env.MODE === 'development') {
  worker.start()
}

const ui = createUi()
const app = createApp(App)

app.use(ui)
app.use(i18n)
app.use(router)

registerSW()

app.mount('#app')
