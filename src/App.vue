<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { getLocalToken, getLocalExpiresIn } from './util/auth/index';

onMounted(() => {
  const userStore = useUserStoreWithOut()
  const token = userStore.getToken || getLocalToken()
  const expiresIn = userStore.getExpiresIn || getLocalExpiresIn()
  if (token && expiresIn) {
    userStore.login(token, expiresIn)
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.name" />
  </router-view>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
@import "./assets/scss/balmUI.scss"
</style>
