<script lang="ts" setup>
import {ref} from 'vue'
</script>

<template>
  <el-container>
    <el-aside style="max-width: 100px">
      <el-menu
          default-active="home"
          class="el-menu-vertical"
          router
          @open="handleOpen"
          @close="handleClose"
      >
        <div class="logo">
          <ui-icon :size="40">trip_origin</ui-icon>
        </div>
        <el-menu-item index="home">
          <ui-icon :size="18">house_siding</ui-icon>
          首 页
        </el-menu-item>
        <el-menu-item index="/file">
          <ui-icon :size="18">folder_open</ui-icon>
          归 档
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">crop_original</ui-icon>
          相 册
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">opacity</ui-icon>
          收 藏
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">ios_share</ui-icon>
          关 于
        </el-menu-item>
        <el-menu-item index="3">
          <ui-icon :size="18">search</ui-icon>
          搜 索
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import "src/assets/scss/home";
</style>