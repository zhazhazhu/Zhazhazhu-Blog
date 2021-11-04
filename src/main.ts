import { createApp } from 'vue'
import App from './App.vue'
import 'balm-ui-css';
import router from "/@/router/index";
import setupBalm from "/@/balm";
import setupElement from './element';

async function bootstrap() {
  const app = createApp(App)

  setupBalm(app)

  setupElement(app)

  app.use(router)
  app.mount('#app')
}

void bootstrap()
