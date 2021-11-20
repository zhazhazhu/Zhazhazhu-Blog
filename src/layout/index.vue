<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStoreWithOut } from '../store/modules/user';
import blogRoutes from '../router/model/blog';

const userStore = useUserStoreWithOut()
const avatar = computed(() => {
  return userStore.getUserInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})


const route = useRoute()

function activeLogout() {
  const userStore = useUserStoreWithOut()
  userStore.logout()
}
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="route.fullPath" class="el-menu-vertical" router>
        <div class="logo">
          <el-dropdown>
            <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="activeLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-menu-item v-for="route in blogRoutes" :key="route.name" :index="route.path">
          <ui-icon :size="18">{{ route.meta?.Icon }}</ui-icon>
          {{ route.meta?.Menu }}
        </el-menu-item>
      </el-menu>
      <el-backtop>
        <ui-icon>arrow_circle_up</ui-icon>
      </el-backtop>
    </el-aside>
    <el-container>
      <router-view />
      <div class="footer-info">Q渣渣猪 © {{ dayjs().format('YYYY') }}</div>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@import "src/assets/scss/layout.scss";
</style>