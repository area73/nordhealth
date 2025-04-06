import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@provetcloud/css'
import '@provetcloud/web-components'
import './assets/main.css'

if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => worker.start())
}
const app = createApp(App)

app.use(router)

app.mount('#app')
