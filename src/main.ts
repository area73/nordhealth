import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@provetcloud/css'
import '@provetcloud/web-components'
import './assets/main.css'

// TODO: we could limit this only to development mode but right now I live it as it is to run the e2e test
import('./mocks/browser').then(({ worker }) => worker.start())

const app = createApp(App)

app.use(router)

app.mount('#app')
