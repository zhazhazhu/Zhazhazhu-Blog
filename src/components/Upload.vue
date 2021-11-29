<script lang='ts'>
import { defineComponent, ref, toRefs } from 'vue';
import { Plus } from '@element-plus/icons'
import { ElMessage } from 'element-plus';
import { getUploadPhoto } from '../api/blogs';
export default defineComponent({
  components: { Plus },
  props: {
    limit: {
      type: Number,
      default: 3
    },
    listType: {
      type: String,
      default: 'picture-card',
    },
    imgUrl: {
      type: Array,
      default: []
    }
  },
  emits: ['update:imgUrl'],
  setup(props, { emit }) {
    const uploadUrl = window.projectConfig.uploadAvatar()

    const { limit } = toRefs(props);
    function handleExceed(files, fileList) {
      ElMessage.warning(
        `当前限制选择 ${limit.value} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    }

    function handleChange(file) {
      const formData = new FormData()
      formData.append('File', file)
    }

    const imgList = ref<string[]>([])
    async function handleSuccess({ data }, file, fileList) {
      const res = await getUploadPhoto(data[0])
      if (res.code === 1) {
        imgList.value.push(res.data[0])
        emit('update:imgUrl', imgList.value)
      }
    }
    return {
      imgList,
      uploadUrl,
      handleExceed,
      handleChange,
      handleSuccess
    }
  }
})


</script>

<template>
  <el-upload
    class="upload-photo"
    :listType="listType"
    :action="uploadUrl"
    multiple
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :on-success="handleSuccess"
  >
    <el-icon class="el-icon--upload">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
.upload-photo {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  justify-content: flex-start;
  flex-wrap: wrap;
  :deep(.el-upload--picture-card) {
    width: 90px;
    height: 90px;
    .el-icon--upload {
      margin-top: 30px;
    }
  }
  :deep(ul li) {
    width: 90px;
    height: 90px;
    margin: 0;
    margin-right: 8px;
  }
}
</style>
