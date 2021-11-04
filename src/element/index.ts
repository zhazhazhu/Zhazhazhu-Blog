import { App } from 'vue'
import { ElCarousel, ElImage } from 'element-plus'

const elList = [
    ElCarousel,
    ElImage
]

function setupElement(app: App) {
    elList.forEach((item) => {
        app.use(item)
    })
}

export default setupElement
