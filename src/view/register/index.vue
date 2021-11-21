<script lang='ts' setup>
import { ref } from 'vue';
import { userInfoModel } from './types/index';
import { ElForm, ElLoading } from 'element-plus';
import { register } from '/@/api/user';
import router from '/@/router';
import myUpload from 'vue-image-crop-upload';
import { ElMessage } from 'element-plus';
import { convertBase64UrlToBlob } from '/@/util/Base64ToBlog';

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

const uploadUrl = window.projectConfig.uploadAvatar()

function actionRegister() {
  userFormRef.value?.validate(async (valid) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const { userName, passWord, email, avatar, phoneNumber } = userInfo.value
      const dto = {
        userName,
        passWord,
        email,
        avatar,
        phoneNumber
      }
      const { code, message } = await register(dto)
      if (code === 1) {
        ElMessage({
          message: `${message} 即将跳转登录页...`
        })
        router.push('/login')
      } else {
        ElMessage.error({
          message
        })
      }
      loading.close()
      return true
    }
    return false
  })
}

function returnLogin() {
  router.go(-1)
}

const userFormRef = ref<InstanceType<typeof ElForm>>()

const show = ref(false)
const imgDataUrl = ref<FormData>()
function cropSuccess(url, field) {
  const blob = convertBase64UrlToBlob(url)
  const formData = new FormData()
  formData.append('File', blob, Date.now() + field)
  imgDataUrl.value = formData
}
function cropUploadSuccess(res) {
  const { code, data, message } = res
  if (code === 1) {
    userInfo.value.avatar = data[0]
    ElMessage.success({
      message
    })
  }
}
function cropUploadFail(status, field) {
  console.log('-------- upload fail --------');
  console.log(status);
  console.log('field: ' + field);
}

function upload() {
  show.value = true
}
</script>

<template>
  <my-upload
    field="file"
    @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
    v-model="show"
    :width="500"
    :height="500"
    :url="uploadUrl"
    img-format="png"
  ></my-upload>
  <!-- <el-image src="/@/assets/image/Login.png" class="img"></el-image> -->
  <main class="content">
    <header>
      <el-image src="/image/Logo.png"></el-image>
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
      <ui-button @click="upload" :type="1" style="margin-bottom: 24px;">上传头像</ui-button>

      <ui-button @click="actionRegister" :type="2">注 册</ui-button>

      <div class="button-bottom">
        <ui-button @click="returnLogin">返 回</ui-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "./style/index.scss";
@import "./style/upload.scss";
</style>
