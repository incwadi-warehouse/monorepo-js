import { createUi } from '@baldeweg/ui'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n.js'
import '@baldeweg/ui/styles'

const theme = () => {
  if (import.meta.env.VUE_APP_THEME === 'false') return

  document.documentElement.innerHTML +=
    '<style>@import "' + import.meta.env.VUE_APP_THEME + '";</style>'
}

theme()

const ui = createUi()
const app = createApp(App)

app.use(ui)
app.use(i18n)
app.use(router)

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

enableMocking().then(() => {
  app.mount('#app')
})
