import {createApp} from 'vue'
import App from './App.vue'
import BalmUI from 'balm-ui'; // Official Google Material Components
import 'balm-ui-css';

async function bootstrap() {
  const app = createApp(App)
  app.use(BalmUI);

  app.mount('#app')
}

void bootstrap()
