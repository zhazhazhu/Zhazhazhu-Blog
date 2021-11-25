import { App } from 'vue'
import { ElContainer, ElCarousel, ElImage, ElMenu, ElAside, ElMain, ElCard, ElPagination, ElBacktop, ElButton, ElUpload, ElMessage, ElForm, ElFormItem, ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem, ElInput, ElRow, ElCol } from 'element-plus'

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
  ElUpload,
  ElMessage,
  ElForm,
  ElFormItem,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElInput,
  ElRow,
  ElCol
]
function setupElement(app: App) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small', zIndex: 3000
  }
  elList.forEach((item) => {
    app.use(item)
  })
}

export default setupElement
