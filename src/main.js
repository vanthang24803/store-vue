import './assets/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createHead } from '@unhead/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

const head = createHead();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(head)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .mount('#app');
