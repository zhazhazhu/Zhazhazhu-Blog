<script lang='ts' setup>
import { ref } from 'vue';
import { userInfoModel } from './types/index';
import type { ElForm } from 'element-plus';
import { register } from '/@/api/user';

function validatePass(rule, value, cb) {
  if (value === '') {
    cb(new Error('请输入密码'))
  } else {
    if (userInfo.value.checkPass !== '') {
      userFormRef.value?.validateField('checkPass', cb())
    }
    cb()
  }
}

function validatePass2(rule, value, cb) {
  if (value === '') {
    cb(new Error('请再次输入密码'))
  } else if (value !== userInfo.value.passWord) {
    cb(new Error('两次输入密码不一致!'))
  } else {
    cb()
  }
}

const UserRules = {
  userName: [{ required: true, message: 'UserName no null', trigger: 'blur' }],
  passWord: [{ required: true, message: 'PassWord no null', trigger: 'blur', validator: validatePass }],
  checkPass: [{ required: true, message: 'PassWord inequality', trigger: 'blur', validator: validatePass2 }],
  phoneNumber: [{ required: true, message: 'phoneNumber no null', trigger: 'blur' }]
}

const userInfo = ref<userInfoModel>({
  userName: '',
  passWord: '',
  checkPass: '',
  email: '',
  avatar: '',
  phoneNumber: ''
})

function actionRegister() {
  userFormRef.value?.validate(async (valid) => {
    if (valid) {
      const { userName, passWord, email, avatar, phoneNumber } = userInfo.value
      const dto = {
        userName,
        passWord,
        email,
        avatar,
        phoneNumber
      }
      await register(dto)
      return true
    }
    return false
  })
}

const userFormRef = ref<InstanceType<typeof ElForm>>()
</script>

<template>
  <!-- <el-image src="/@/assets/image/Login.png" class="img"></el-image> -->
  <main class="content">
    <header>
      <el-image src="/@/assets/image/Logo.png"></el-image>
    </header>
    <div class="user">
      <el-form ref="userFormRef" :model="userInfo" :rules="UserRules">
        <el-form-item prop="userName">
          <ui-textfield class="input" required v-model="userInfo.userName">
            UserName
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>person</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
        <el-form-item prop="passWord">
          <ui-textfield inputType="password" required class="input" v-model="userInfo.passWord">
            PassWord
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>vpn_key</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
        <el-form-item prop="checkPass">
          <ui-textfield inputType="password" required class="input" v-model="userInfo.checkPass">
            PassWord
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>vpn_key</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <ui-textfield required class="input" v-model="userInfo.phoneNumber">
            Phone
            <template #after="{ iconClass }">
              <span :class="iconClass">
                <ui-icon>smartphone</ui-icon>
              </span>
            </template>
          </ui-textfield>
        </el-form-item>
      </el-form>
      <ui-button :type="1" style="margin-bottom: 24px;">上传头像</ui-button>

      <ui-button @click="actionRegister" :type="2">注 册</ui-button>

      <div class="button-bottom">
        <ui-button>返 回</ui-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
