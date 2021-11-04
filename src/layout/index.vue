<script lang="ts" setup>
import { ref } from 'vue'

const type = ref(6)
const title = ref('Hello BalmUI')
const openDrawer = ref(true)
</script>

<template>
  <!-- Drawer -->
  <ui-drawer type="modal" viewport-height nav-id="qiqi-menu">
    <ui-drawer-header>
      <ui-drawer-title>Zhazhazhu</ui-drawer-title>
      <ui-drawer-subtitle>qiqi</ui-drawer-subtitle>
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <router-link to="/home">
          <ui-nav-item href="javascript:void(0)" active>
            <ui-icon :size="18">house_siding</ui-icon>首 页
          </ui-nav-item>
        </router-link>
        <ui-nav-item href="javascript:void(1)">
          <ui-icon :size="18">folder_open</ui-icon>归 档
        </ui-nav-item>
        <ui-nav-item href="javascript:void(2)">
          <ui-icon :size="18">crop_original</ui-icon>相 册
        </ui-nav-item>
        <ui-nav-item href="javascript:void(3)">
          <ui-icon :size="18">opacity</ui-icon>收 藏
        </ui-nav-item>
        <ui-nav-item href="javascript:void(4)">
          <ui-icon :size="18">ios_share</ui-icon>关 于
        </ui-nav-item>
        <ui-nav-item href="javascript:void(5)">
          <ui-icon :size="18">search</ui-icon>搜 索
        </ui-nav-item>
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <!-- Content -->
  <ui-drawer-app-content class="demo-content">
    <!-- App bar -->
    <ui-top-app-bar nav-id="qiqi-menu" :type="type">
      <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button :class="toolbarItemClass" icon="more_vert"></ui-icon-button>
      </template>
    </ui-top-app-bar>
    <div class="demo-app-content">
      <router-view></router-view>
    </div>
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