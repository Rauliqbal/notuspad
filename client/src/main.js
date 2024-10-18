import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as HiIcons from "oh-vue-icons/icons/hi";

const Hi = Object.values({ ...HiIcons })
addIcons(...Hi)

createApp(App).component("v-icon", OhVueIcon).use(router).mount('#app')
