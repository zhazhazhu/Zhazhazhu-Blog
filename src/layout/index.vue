<script lang="ts" setup>
import {ref} from 'vue'

const type = ref(1)
const title = ref('Hello BalmUI')
const openDrawer = ref(false)
</script>

<template>
  <!-- Drawer -->
  <ui-drawer type="modal" viewport-height nav-id="demo-menu" class="menu">
    <ui-drawer-header>
      <ui-drawer-title>Zhazhazhu</ui-drawer-title>
      <ui-drawer-subtitle>qiqi</ui-drawer-subtitle>
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <ui-nav-item href="javascript:void(0)" active>首页</ui-nav-item>
        <ui-nav-item href="javascript:void(1)">归档</ui-nav-item>
        <ui-nav-item href="javascript:void(2)">相册</ui-nav-item>
        <ui-nav-item href="javascript:void(3)">收藏</ui-nav-item>
        <ui-nav-item href="javascript:void(4)">关于</ui-nav-item>
        <ui-nav-item href="javascript:void(5)">搜索</ui-nav-item>
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <!-- Content -->
  <ui-drawer-app-content class="demo-content">
    <!-- App bar -->
    <ui-top-app-bar
        content-selector=".demo-app-content"
        nav-id="demo-menu"
        :type="type"
        :title="title"
    >
    </ui-top-app-bar>
    <!-- App content -->
  </ui-drawer-app-content>
</template>

<style lang="scss">
.demo-content {
  width: 100%;
}

.demo-app-content {
  height: 100%;
  overflow: auto;
}
</style>