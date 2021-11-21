<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
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

const isCollapse = ref(false)
function clickMenu() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <main class="zuida">
    <div class="aside-button" :class="{ 'isMenu': isCollapse }">
      <el-affix :offset="20">
        <ui-icon @click="clickMenu">menu_open</ui-icon>
      </el-affix>
    </div>
    <el-aside v-show="isCollapse">
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
          <span>{{ route.meta?.Menu }}</span>
        </el-menu-item>
      </el-menu>
      <el-backtop>
        <ui-icon>arrow_circle_up</ui-icon>
      </el-backtop>
    </el-aside>
    <main class="footer-index" :class="{ 'main-content': isCollapse }">
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