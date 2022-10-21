import App from './App.vue'
import { createUi } from '@baldeweg/ui'
import { createApp } from 'vue'
import router from './router'
import i18n from './i18n.js'
import { registerSW } from 'virtual:pwa-register'
import '@baldeweg/ui/styles'

const theme = () => {
  if (import.meta.env.VUE_APP_THEME !== 'false') {
    return '<style>@import "' + import.meta.env.VUE_APP_THEME + '";</style>'
  }

  return ''
}

document.documentElement.innerHTML += theme()

const ui = createUi()
const app = createApp(App)

app.use(ui)
app.use(i18n)
app.use(router)

registerSW()

app.mount('#app')
