<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'
import { getBlogList } from '../../api/blogs';
import { searchListModel } from '../../api/types/blogsModel';
import { blogListModel } from './types/homeModel';
import router from '/@/router';

const initBlogList = () => ref<blogListModel[]>([])

const blogList = initBlogList()

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const searchData = ref<searchListModel>({
  pageIndex: 1, //当前页
  pageSize: 10, //展示多少条数据
  keyWord: "", //搜索
  sortField: "",
  sortType: "",
  totalCount: 0, //总共多少条
})

async function getBlog() {
  const { code, data, pages, total } = await getBlogList(searchData.value)
  if (code === 1) {
    searchData.value.pageIndex = pages || 1
    searchData.value.totalCount = total || 1
    blogList.value = data
  }
}

function viewBlog(blog) {
  router.push({
    path: 'blog',
    name: 'Blog',
    params: { id: blog.id }
  })
}

onMounted(() => {
  getBlog()
})

</script>

<template>
  <div class="content" :class="{ 'isMenu': isCollapse }">
    <div class="header-img">
      <el-image fit="fill" style="height: 100vh" src="/image/Sunflower-mobile.jpg"></el-image>
      <div class="title-button" :class="{ 'isMenu': isCollapse }">
        <ui-icon class="title">Q 渣渣猪</ui-icon>
        <div class="text">秋天该很好｜没有烟｜总有花｜张国荣</div>
        <el-image class="logo" src="/image/Logo-white.png"></el-image>
      </div>
      <ui-icon class="mouse-button">mouse</ui-icon>
    </div>

    <div v-for="blog in blogList" :key="blog.id">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <h2>{{ blog.title }}</h2>
            <div class="created-time">
              <ui-icon size="16">date_range</ui-icon>
              {{ dayjs(blog.createdAt).format('YYYY/MM/DD') }}
            </div>
          </div>
        </template>
        <div>{{ blog.abstract }}</div>
        <el-button type="text" @click="viewBlog(blog)">阅读全文...</el-button>
      </el-card>
    </div>
    <div class="footer">
      <el-pagination layout="prev, pager, next" :total="searchData.totalCount"></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/home.scss";
</style>