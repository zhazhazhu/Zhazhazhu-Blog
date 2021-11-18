<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getUploadPhoto } from '/@/api/blogs';

const photoList = ref<string[]>([])

const labelsType = ref(1)

onMounted(() => {
  init()
})

async function init() {
  const { code, data } = await getUploadPhoto()
  if (code === 1) {
    photoList.value = data
  }
}
</script>

<template>
  <div class="p-4">
    <header>
      <h2>相册</h2>
    </header>
    <ui-image-list type="masonry" :text-protection="labelsType === 2" class="demo">
      <ui-image-item
        class="image-item"
        v-for="(item, index) in photoList"
        :key="index"
        :image="item"
      >
        <ui-image-text v-if="labelsType">
          Text label
          <template #action>
            <ui-icon-button icon="favorite_border"></ui-icon-button>
          </template>
        </ui-image-text>
      </ui-image-item>
    </ui-image-list>
  </div>
</template>

<style lang="scss" scoped>
@import './style/index.scss'
</style>
