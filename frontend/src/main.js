import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);


app.use(router);
app.mount('#app');
