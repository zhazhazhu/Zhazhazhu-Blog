import type { App } from 'vue'
import BalmUI from 'balm-ui'; // Official Google Material Components
import UiButton from 'balm-ui/components/button';
import UiIcon from 'balm-ui/components/icon';
import UiDivider from 'balm-ui/components/divider';
import UiTextfield from 'balm-ui/components/textfield';
import UiImageList from 'balm-ui/components/image-list';
import UiIconButton from 'balm-ui/components/icon-button';
import UiBottomSheet from 'balm-ui/components/bottom-sheet'
import UiEditor from 'balm-ui/components/editor';
import UiDialog from 'balm-ui/components/dialog';
import UiMenu from 'balm-ui/components/menu';

const elList = [
  UiButton,
  UiIcon,
  UiDivider,
  UiTextfield,
  UiImageList,
  UiIconButton,
  UiBottomSheet,
  UiEditor,
  UiDialog,
  UiMenu
]

function setupBalm(app: App) {
  elList.forEach((item) => {
    app.use(item)
  })
}

export default setupBalm