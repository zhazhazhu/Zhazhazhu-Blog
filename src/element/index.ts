import {App} from 'vue'
import ElContainer, {ElCarousel, ElImage, ElMenu, ElAside, ElMain} from 'element-plus'
import ElButton from "element-plus";

const elList = [
  ElCarousel,
  ElImage,
  ElMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElButton
]

function setupElement(app: App) {
  elList.forEach((item) => {
    app.use(item)
  })
}

export default setupElement
