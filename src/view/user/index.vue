<script lang='ts' setup>
import { computed } from 'vue';
import { useUserStoreWithOut } from '/@/store/modules/user';

const userStore = useUserStoreWithOut()
const userInfo = userStore.getUserInfo
const avatar = computed(() => {
  const head = window.projectConfig.hosts.avatar
  if (userStore.getUserInfo?.avatar.includes('http')) {
    return userStore.getUserInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
  return head + userStore.getUserInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
function goGitHub() {
  window.location.href = "https://github.com/zhazhazhu"
}

function logout() {
  userStore.logout()
}
</script>

<template>
  <div class="p-4">
    <header>
      <div class="head">
        <img src="/image/user.png" />
      </div>
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="6">
          <el-avatar :size="70" :src="avatar"></el-avatar>
        </el-col>
        <el-col :span="12">
          <div class="userName">{{ userInfo?.userName }}</div>
          <div class="email">{{ userInfo?.email ? userInfo?.email : "空" }}</div>
        </el-col>
      </el-row>
    </header>
    <main>
      <el-row type="flex" justify="center" class="head-bottom">
        <el-col :span="8" style="text-align: center;">
          <div class="title">帖子</div>
          <div>8</div>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <div class="title">赞过</div>
          <div>4</div>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <div class="title">消息</div>
          <div>8</div>
        </el-col>
      </el-row>
      <div class="buttons" @click="goGitHub">
        <img style="width: 28px;" src="/icon/关于我们.png" />
        <span class="text">关于作者</span>
        <ui-icon class="icon">arrow_forward_ios</ui-icon>
      </div>
      <div class="logout">
        <ui-button raised @click="logout">退出登录</ui-button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/style.scss";
</style>
