import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import directives from "./directives"

const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(router)

app.mount('#app')
