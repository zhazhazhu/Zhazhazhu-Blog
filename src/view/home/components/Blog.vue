<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogData } from '/@/api/blogs';
import { blogDetailModel } from '../types/homeModel';
import dayjs from 'dayjs';
import { useUserStoreWithOut } from '/@/store/modules/user';

const userStore = useUserStoreWithOut()
const avatar = computed(() => {
  const head = window.projectConfig.hosts.avatar
  return head + userStore.getUserInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const route = useRoute()

const BlogId = ref('')

onMounted(() => {
  init()
})

const blogDetail = ref<blogDetailModel>()

async function init() {
  const { id } = route.params
  BlogId.value = id as string
  const { code, data } = await getBlogData(BlogId.value)
  if (code === 1) {
    blogDetail.value = data
  }
}

const commentInfo = ref('')
</script>

<template>
  <div class="p-4">
    <header>
      <h2>{{ blogDetail?.title }}</h2>
      <div class="created-time">
        <ui-icon size="16">date_range</ui-icon>
        {{ dayjs(blogDetail?.createdAt).format('YYYY/MM/DD') }}
      </div>
    </header>
    <main>
      <div class="detail-content">
        <div v-html="blogDetail?.content"></div>
        <div class="button">
          <el-button type="text">前一篇</el-button>
          <el-button type="text">后一篇</el-button>
        </div>
      </div>
      <div class="comment">
        <ui-divider></ui-divider>
      </div>
    </main>
    <footer>
      <div class="text">
        <ui-icon style="color: #7d7d7d;">forum</ui-icon>
        <div style="color: #7d7d7d;">{{ blogDetail?.commentList.length }}</div>
      </div>
      <div class="comment-input">
        <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
        <el-input
          type="textarea"
          placeholder="说点什么..."
          v-model="commentInfo"
          maxlength="100"
          rows="4"
          show-word-limit
        ></el-input>
      </div>
      <div>
        <el-button type="primary" size="mini" style="float: right;">评论</el-button>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/blog.scss";
</style>
