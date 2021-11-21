<script lang='ts' setup>
import { ref } from 'vue';
import { login } from '../../api/user';
import { userModel } from './types/index';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { ElLoading, ElMessage } from 'element-plus';
import type { ElForm } from 'element-plus';
import router from '/@/router';

const user = ref<userModel>({
  userName: '',
  passWord: ''
})

const userFormRef = ref<InstanceType<typeof ElForm>>()
const UserRules = {
  userName: [{ required: true, message: '嘿，用户名不能为空^_^', trigger: 'blur' }],
  passWord: [{ required: true, message: '嘿，密码不能为空^_^', trigger: 'blur' }],
}

const userStore = useUserStoreWithOut()

function signIn() {
  userFormRef.value?.validate(async (valid) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const { code, data } = await login(user.value)
      if (code === 1) {
        const { token, expiresIn } = data
        userStore.login(token, Date.now() + (expiresIn * 1000))
        loading.close()
        ElMessage({
          message: 'LOGIN SUCCESS...'
        })
      }
      return true
    } else {
      return false
    }
  })

}

function goRegister() {
  router.push('/register')
}
</script>

<template>
  <!-- <el-image src="/image/login.jpg" class="img"></el-image> -->
  <main class="content">
    <header>
      <el-image src="/image/Logo.png"></el-image>
    </header>
    <div class="user">
      <el-form ref="userFormRef" :model="user" :rules="UserRules">
        <el-form-item prop="userName">
          <ui-textfield class="input" required helperTextId="1" v-model="user.userName">
            用 户 名
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>person</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
        <el-form-item prop="passWord">
          <ui-textfield
            inputType="password"
            class="input"
            required
            helperTextId="2"
            v-model="user.passWord"
          >
            密 码
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>vpn_key</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
      </el-form>
      <ui-button @click="signIn" :type="2">登 录</ui-button>
      <div class="button-bottom">
        <ui-button @click="goRegister">注册</ui-button>
        <ui-button>忘记密码?</ui-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
