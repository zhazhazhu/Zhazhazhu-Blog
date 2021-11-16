<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'
import { getBlogList } from '../../api/blogs';
import { searchListModel } from '../../api/types/blogsModel';
import { blogListModel } from './types/homeModel';

const initBlogList = () => ref<blogListModel[]>([])

const blogList = initBlogList()

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

onMounted(() => {
  getBlog()
})

</script>

<template>
  <div class="header-img">
    <el-image fit="cover" style="width: 100%;height: 100vh" src="src/assets/image/Sunflower1.jpg"></el-image>
    <div class="title-button">
      <ui-button>Q 渣渣猪</ui-button>
      <div class="text">GitHub | Gitee</div>
    </div>
  </div>
  <div class="aside-button">
    <ui-icon-button icon="menu_open" outlined></ui-icon-button>
  </div>
  <div v-for="blog in blogList" :key="blog.id">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <h1>{{ blog.title }}</h1>
          <div class="created-time">
            <ui-icon size="16">date_range</ui-icon>
            {{ blog.createdAt }}
          </div>
        </div>
      </template>
      <div>{{ blog.content }}</div>
    </el-card>
  </div>
  <div class="footer">
    <el-pagination layout="prev, pager, next" :total="searchData.totalCount"></el-pagination>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/home.scss";
.aside-button {
  position: absolute;
  top: 20px;
  left: 120px;
}
</style>