import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import directives from "./directives"
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap;

const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(router)

app.mount('#app')
