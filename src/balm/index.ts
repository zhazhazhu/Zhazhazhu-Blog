import type {App} from 'vue'
import BalmUI from 'balm-ui'; // Official Google Material Components

function setupBalm(app:App){
  app.use(BalmUI,{
  })
}

export default setupBalm