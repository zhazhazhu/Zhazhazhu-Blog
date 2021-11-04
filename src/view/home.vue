<script lang="ts" setup>
import { onMounted, ref } from 'vue';
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
    <el-image src="src/assets/video/111.gif"></el-image>
  </div>
</template>

<style lang="scss" scoped>
.header-img {
  img {
    height: 100vh;
  }
}
</style>