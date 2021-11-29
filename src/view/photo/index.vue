<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getPhotoByUserId } from '/@/api/blogs';
import router from '/@/router';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { photoListModel } from './types/index';

const userStore = useUserStoreWithOut()
const userId = userStore.getUserInfo?.id || ''

const photoList = ref<photoListModel[]>([])

const labelsType = ref(1)

function showDialog() {
  router.push('/uploadPhoto')
}

onMounted(() => {
  init()
})

async function init() {
  const { code, data } = await getPhotoByUserId(userId)
  if (code === 1) {
    photoList.value = data
  }
}
</script>

<template>
  <div class="p-4">
    <ui-icon class="upload-button" @click="showDialog">file_upload</ui-icon>
    <header>
      <h2>相册</h2>
    </header>
    <ui-image-list type="masonry" :text-protection="labelsType === 2" class="demo">
      <ui-image-item
        class="image-item"
        v-for="item in photoList"
        :key="item.id"
        :image="item.imgUrl"
      >
        <ui-image-text v-if="labelsType">
          {{item.title}}
          <template #action>
            <ui-icon-button icon="favorite_border"></ui-icon-button>
          </template>
        </ui-image-text>
      </ui-image-item>
    </ui-image-list>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
