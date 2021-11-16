import { App } from 'vue'
import ElContainer, { ElCarousel, ElImage, ElMenu, ElAside, ElMain, ElCard, ElPagination, ElBacktop, ElButton, ElUpload } from 'element-plus'

const elList = [
  ElCarousel,
  ElImage,
  ElMenu,
  ElContainer,
  ElAside,
  ElMain,
  ElButton,
  ElCard,
  ElPagination,
  ElBacktop,
  ElUpload
]
function setupElement(app: App) {
  elList.forEach((item) => {
    app.use(item)
  })
}

export default setupElement
