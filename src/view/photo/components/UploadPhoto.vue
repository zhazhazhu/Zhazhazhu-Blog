<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Upload from '/@/components/Upload.vue'
import { useUserStoreWithOut } from '/@/store/modules/user';
import { photoModel } from '/@/api/types/blogsModel';
import { savePhoto } from '/@/api/blogs';
import { ElMessage } from 'element-plus';
import router from '/@/router';

export default defineComponent({
  components: { Upload },
  setup() {
    const userStore = useUserStoreWithOut()

    const userId = userStore.getUserInfo?.id || ''

    const imgUrl = ref<string[]>([])
    const title = ref('')

    async function upload() {
      const titleList = title.value.split(/[,|，]/)
      const promiseAll: Array<Promise<any>> = []
      for (let i = 0; i < imgUrl.value.length; i++) {
        const obj: photoModel = {
          id: null,
          title: titleList[i],
          imgUrl: imgUrl.value[i],
          userId
        }
        promiseAll.push(savePhoto(obj))
      }
      await Promise.all(promiseAll)
      ElMessage.success({
        message: '上传成功'
      })
      router.push('/photo')
    }
    return {
      imgUrl,
      title,
      upload
    }
  }
})
</script>

<template>
  <div class="p-4">
    <header>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12" style="text-align: center;"></el-col>
        <el-col :span="5" style="text-align: right;">
          <ui-button raised @click="upload">上传</ui-button>
        </el-col>
      </el-row>
    </header>
    <main>
      <el-input
        v-model="title"
        type="textarea"
        :rows="4"
        placeholder="照片名称，多张请用 , 隔开"
        class="el-input"
        resize="none"
      ></el-input>
      <Upload v-model:imgUrl="imgUrl" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  height: 60px;
  line-height: 50px;
}
main {
  :deep(.el-textarea__inner) {
    border: none;
  }
}
</style>
