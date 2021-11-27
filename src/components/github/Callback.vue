<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { gitHubLogin } from '/@/api/user';
import router from '/@/router';
import { useUserStoreWithOut } from '/@/store/modules/user';

const userStore = useUserStoreWithOut()
const route = useRoute()
const code = ref('')

async function login() {
  code.value = String(route.query.code)
  const { code: resCode, data, message } = await gitHubLogin(code.value)
  debugger
  if (resCode === 1) {
    userStore.setToken(data.token)
    userStore.setExpiresIn(data.expiresIn)
    userStore.setUserInfo(data.userInfo)
    ElMessage({
      message: 'LOGIN SUCCESS...'
    })
    router.push('/home')
  } else {
    ElMessage.error({
      message
    })
  }
}
onMounted(() => {
  login()
})
</script>

