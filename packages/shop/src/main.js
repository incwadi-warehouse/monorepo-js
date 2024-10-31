import { createUi } from '@baldeweg/ui'
import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'
import i18n from './i18n.js'
import '@baldeweg/ui/styles'
import { createHead } from '@unhead/vue'

const theme = () => {
  if (import.meta.env.VITE_THEME === 'false') return

  document.documentElement.innerHTML +=
    '<style>@import "' + import.meta.env.VITE_THEME + '";</style>'
}

theme()

const ui = createUi()
const app = createApp(App)
const head = createHead()

app.use(ui)
app.use(i18n)
app.use(router)
app.use(head)

registerSW()

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
