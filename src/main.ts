import { createApp } from 'vue'
import App from './App.vue'
import 'balm-ui-css';
import { setupStore } from '/@/store';
import router from "/@/router/index";
import setupBalm from "/@/balm";
import setupElement from './element';
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';

async function bootstrap() {
  const app = createApp(App)

  dayjs.locale('zh-cn')
  
  setupStore(app)
  
  setupBalm(app)

  setupElement(app)

  app.use(router)
  app.mount('#app')
}

void bootstrap()
