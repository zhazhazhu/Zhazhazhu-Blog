<script lang='ts' setup>
import { ref } from 'vue';
import { login } from '../../api/user';
import { userModel } from './types/index';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { ElMessage } from 'element-plus';
import router from '/@/router';

const user = ref<userModel>({
  userName: '',
  passWord: ''
})

const userStore = useUserStoreWithOut()

async function signIn() {
  const { code, data } = await login(user.value)
  if (code === 1) {
    const { token, expiresIn } = data
    userStore.login(token, expiresIn)
    ElMessage({
      message: 'LOGIN SUCCESS...'
    })
  }
}

function goRegister() {
  router.push('/register')
}
</script>

<template>
  <!-- <el-image src="/@/assets/image/Login.png" class="img"></el-image> -->
  <main class="content">
    <header>
      <el-image src="/@/assets/image/Logo.png"></el-image>
    </header>
    <div class="user">
      <ui-textfield class="input" required helperTextId="1" v-model="user.userName">
        UserName
        <template #after="{ iconClass }">
          <span :class="iconClass">
            <ui-icon>person</ui-icon>
          </span>
        </template>
      </ui-textfield>
      <ui-textfield-helper id="1" validMsg="userName no null"></ui-textfield-helper>
      <ui-textfield
        inputType="password"
        class="input"
        required
        helperTextId="2"
        v-model="user.passWord"
      >
        PassWord
        <template #after="{ iconClass }">
          <span :class="iconClass">
            <ui-icon>vpn_key</ui-icon>
          </span>
        </template>
      </ui-textfield>
      <ui-textfield-helper id="2" validMsg="passWord no null"></ui-textfield-helper>
      <ui-button @click="signIn" @enter="signIn" :type="2">登 录</ui-button>
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
