<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu
        :default-active="route.fullPath"
        class="el-menu-vertical"
        router
      >
        <div class="logo">
          <ui-icon :size="40">trip_origin</ui-icon>
        </div>
        <el-menu-item index="/home">
          <ui-icon :size="18">house_siding</ui-icon>首 页
        </el-menu-item>
        <el-menu-item index="/file">
          <ui-icon :size="18">folder_open</ui-icon>归 档
        </el-menu-item>
        <el-menu-item index="/photo">
          <ui-icon :size="18">crop_original</ui-icon>相 册
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">opacity</ui-icon>收 藏
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">ios_share</ui-icon>关 于
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">search</ui-icon>搜 索
        </el-menu-item>
      </el-menu>
      <el-backtop>
        <ui-icon>arrow_circle_up</ui-icon>
      </el-backtop>
    </el-aside>
    <el-container>
      <router-view />
      <div class="footer-info">Q渣渣猪 © {{dayjs().format('YYYY')}}</div>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@import "src/assets/scss/layout.scss";
</style>