<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs'
import { getBlogList } from '../../api/blogs';
import { searchListModel } from '../../api/types/blogsModel';
import { blogListModel } from './types/fileModel';
import router from '/@/router';

const initBlogList = () => ref<blogListModel[]>([])

const blogList = initBlogList()

const searchData = ref<searchListModel>({
  pageIndex: 1, //当前页
  pageSize: 9, //展示多少条数据
  keyWord: "", //搜索
  sortField: "",
  sortType: "",
  totalCount: 0, //总共多少条
})

async function getBlog() {
  const { code, data, pages, total } = await getBlogList(searchData.value)
  if (code === 1) {
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

function changeCurrent(val) {
  searchData.value.pageIndex = val
  getBlog()
}

onMounted(() => {
  getBlog()
})

</script>

<template>
  <div class="p-4">
    <header>
      <h2>归档</h2>
    </header>
    <main>
      <div class="content">
        <div v-for="blog in blogList" :key="blog.id" class="list-content">
          <div class="icon"></div>
          <div class="time">{{ dayjs(blog.createdAt).format('MM/DD') }}</div>
          <el-button type="text" class="title" @click="viewBlog(blog)">{{ blog.title }}</el-button>
        </div>
      </div>
    </main>
    <footer>
      <el-pagination
        layout="prev, pager, next"
        @current-change="changeCurrent"
        :total="searchData.totalCount"
      ></el-pagination>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/file.scss";
</style>