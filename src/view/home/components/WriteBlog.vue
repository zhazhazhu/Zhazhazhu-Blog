<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useUserStoreWithOut } from '/@/store/modules/user';
import { saveBlog } from '/@/api/blogs';
import { ElLoading, ElMessage } from "element-plus";
import { replaceHtml } from '/@/util/word/index';
import router from "/@/router";

export default defineComponent({
  setup() {
    const userStore = useUserStoreWithOut()

    const userInfo = userStore?.getUserInfo

    function closeEdit() {
      router.go(-1)
    }

    const blogForm = ref({
      title: '',
      abstract: ''
    })
    const content = ref('')

    const visible = ref(false)

    async function release() {
      if (content.value === "") {
        ElMessage({
          message: '内容不能为空'
        })
        return
      }
      blogForm.value.abstract = replaceHtml(content.value).substring(0, 100)
      visible.value = true
    }

    async function ok() {
      if (!blogForm.value.title || !blogForm.value.abstract) {
        ElMessage({ message: '标题或摘要不能为空...' })
        return
      }
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const dto = {
        abstract: blogForm.value.abstract,
        title: blogForm.value.title,
        content: content.value,
        author: userInfo?.userName || ''
      }
      const { code, message } = await saveBlog(dto)
      if (code === 1) {
        ElMessage.success({
          message
        })
        loading.close()
        visible.value = false
        router.push('/home')
      } else {
        loading.close()
      }
    }

    return {
      userInfo,
      blogForm,
      content,
      closeEdit,
      release,
      visible,
      ok,
    }
  }
})

</script>

<template>
  <main style="z-index: 99;">
    <header>
      <el-row justify="center" align="middle">
        <el-col :span="4">
          <ui-button :type="1" @click="closeEdit">返回</ui-button>
        </el-col>
        <el-col :span="14" class="text">
          <span>发博客</span>
          <span>{{ userInfo?.userName }}</span>
        </el-col>
        <el-col :span="4" style="text-align: right;">
          <ui-button :type="2" @click="release">发布</ui-button>
        </el-col>
      </el-row>
    </header>
    <main>
      <ui-editor v-model="content" placeholder="内容"></ui-editor>
    </main>
  </main>
  <ui-dialog v-model="visible" class="dialog">
    <ui-dialog-title>发布博客</ui-dialog-title>
    <ui-dialog-content>
      <el-form v-model="blogForm" label-position="top">
        <el-form-item label="标题">
          <el-input
            v-model="blogForm.title"
            type="text"
            placeholder="标题"
            maxlength="20"
            show-word-limit
            style="margin-bottom: 10px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            v-model="blogForm.abstract"
            :rows="3"
            type="textarea"
            placeholder="博客摘要"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </ui-dialog-content>
    <ui-dialog-actions>
      <ui-button @click="visible = false">取消</ui-button>
      <ui-button @click="ok" raised>确定发布</ui-button>
    </ui-dialog-actions>
  </ui-dialog>
</template>

<style lang="scss" scoped>
@import "../style/writeBlog.scss";
</style>