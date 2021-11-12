<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Fold } from '@element-plus/icons'
import { asyncImage } from '../util/image';

const imageUrls = ref<string[]>([])

onMounted(() => {
  asyncImage().then((res) => {
    imageUrls.value = res
  })
})

</script>

<template>
  <div class="header-img">
    <el-image fit="cover" style="width: 100%;height: 100vh" src="src/assets/image/home1.jpg"></el-image>
  </div>
  <div class="aside-button">
    <ui-icon-button icon="menu_open" outlined></ui-icon-button>
  </div>
</template>

<style lang="scss" scoped>
.aside-button {
  position: absolute;
  top: 20px;
  left: 120px;
}
</style>