<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogData } from '/@/api/blogs';
import { blogDetailModel } from '../types/homeModel';
import dayjs from 'dayjs';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { saveCommentById } from '/@/api/blogs';
import { deleteCommentById } from '/@/api/blogs';
import { ElMessage } from 'element-plus/lib';
import { useConfirm } from 'balm-ui/plugins/confirm';
import { ChatLineRound } from '@element-plus/icons'
import relativeTime from 'dayjs/plugin/relativeTime'

const userStore = useUserStoreWithOut()
const userInfo = userStore.getUserInfo
const avatar = computed(() => {
  const head = window.projectConfig.hosts.avatar
  return head + userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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

async function saveComment(blogId) {
  const dto = {
    blogId,
    userId: userInfo?.id,
    userName: userInfo?.userName,
    avatar: userInfo?.avatar,
    content: commentInfo.value,
    createdAt: null,
    parentId: null,
    childrenId: null,
  }
  const { code, message } = await saveCommentById(dto)
  if (code === 1) {
    ElMessage.success({
      message
    })
    commentInfo.value = ''
    init()
  }
}

const confirm = useConfirm()
async function deleteComment(id) {
  const result = await confirm({
    message: '确认删除吗？',
    state: 'help',
    acceptText: '删除',
    cancelText: '取消'
  })
  if (result) {
    const { code, message } = await deleteCommentById(id)
    if (code === 1) {
      ElMessage.error({
        message
      })
      init()
    }
  }
}

const uploadUrl = window.projectConfig.hosts.avatar
function handleAvatar(avatar: string) {
  return uploadUrl + avatar
}

const commentInfo = ref('')

const commentElement = ref<PointerEvent>()
function handleChildren(event) {
  commentElement.value = event
  commentElement.value?.pageY
}

function handleCommentTime(time: number) {
  dayjs.extend(relativeTime)
  var a = dayjs()
  var b = dayjs(time)
  return a.to(b)
}
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
        <div v-html="blogDetail?.content" style="height: 85%;"></div>
      </div>
    </main>
    <footer>
      <div class="text">
        <span>{{ blogDetail?.commentList.length }}条评论</span>
      </div>
      <div class="comment-input">
        <el-avatar :size="42" :src="avatar"></el-avatar>
        <el-input
          type="textarea"
          placeholder="说点什么..."
          v-model="commentInfo"
          maxlength="100"
          rows="5"
          show-word-limit
        ></el-input>
      </div>
      <div style="text-align: right;border-bottom: 1px solid #ebeef5; padding-bottom: 20px;">
        <ui-button raised @click="saveComment(blogDetail?.id)">评论</ui-button>
      </div>
      <div v-for="comment in blogDetail?.commentList" :key="comment.id" class="comment-model">
        <el-avatar :size="42" :src="handleAvatar(comment.avatar)"></el-avatar>
        <div class="content-info">
          <div class="user">{{ comment.userName }}</div>
          <div class="content" @click="handleChildren($event)">{{ comment.content }}</div>
          <div class="time-edit">
            <div>{{ handleCommentTime(comment.createdAt) }}</div>
            <div>
              <ui-button
                v-if="comment.userId === userInfo?.id"
                @click="deleteComment(comment.id)"
              >删除</ui-button>
              <ui-button>
                <el-icon>
                  <ChatLineRound />
                </el-icon>回复
              </ui-button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/blog.scss";
</style>
