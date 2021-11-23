<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStoreWithOut } from '../store/modules/user';
import MenuRoutes from '../router/model';

const userStore = useUserStoreWithOut()
const avatar = computed(() => {
  const head = window.projectConfig.hosts.avatar
  return head + userStore.getUserInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const userInfo = userStore.getUserInfo

const route = useRoute()

function activeLogout() {
  const userStore = useUserStoreWithOut()
  userStore.logout()
}

const isCollapse = ref(false)
function clickMenu() {
  isCollapse.value = !isCollapse.value
}

function closeMenu() {
  isCollapse.value = false
}
</script>

<template>
  <main>
    <div>
      <el-affix :offset="20" class="aside-button" :class="{ 'isMenu': isCollapse }">
        <ui-icon @click="clickMenu">menu_open</ui-icon>
      </el-affix>
    </div>
    <el-aside :class="{ 'on': isCollapse }">
      <el-menu :default-active="route.fullPath" class="el-menu-vertical" router>
        <div class="logo">
          <el-dropdown style="display: flex;flex-direction: column;align-items: center">
            <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
            <div class="user-name">{{ userInfo?.userName }}</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="activeLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-menu-item v-for="route in MenuRoutes" :key="route.name" :index="route.path">
          <ui-icon :size="18">{{ route.meta?.Icon }}</ui-icon>
          <span>{{ route.meta?.Menu }}</span>
        </el-menu-item>
      </el-menu>
      <el-backtop right="20">
        <ui-icon>arrow_circle_up</ui-icon>
      </el-backtop>
    </el-aside>
    <main class="footer-index" :class="{ 'on': isCollapse }" @click="closeMenu">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.name" />
      </router-view>
    </main>
    <!-- <div class="footer-info">Q渣渣猪 © {{ dayjs().format('YYYY') }}</div> -->
  </main>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/layout.scss";
</style>