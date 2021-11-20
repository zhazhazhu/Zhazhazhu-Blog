<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { getLocalToken, getLocalExpiresIn } from './util/auth/index';

const token = getLocalToken()
const expiresIn = getLocalExpiresIn()
onMounted(() => {
  const userStore = useUserStoreWithOut()
  if (token && expiresIn) {
    userStore.login(token, expiresIn)
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>
