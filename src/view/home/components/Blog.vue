<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getBlogData } from '/@/api/blogs';
import { blogDetailModel, commentModel } from '../types/homeModel';
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
const totals = ref(0)

async function init() {
  const { id } = route.params
  BlogId.value = id as string
  const { code, data, total } = await getBlogData(BlogId.value)
  if (code === 1) {
    blogDetail.value = data
    totals.value = total || 0
  }
}

const commentInfo = ref('')
const childrenCommentInfo = ref('')
const commentDto = ref<commentModel>({
  blogId: '',
  userId: userInfo?.id || '',
  userName: userInfo?.userName || '',
  avatar: userInfo?.avatar || '',
  content: '',
  createdAt: null,
  parentId: null,
  parentName: null,
  parentAvatar: null,
  childrenId: null,
  rootId: null,
})

async function saveComment(blogId) {
  if (!commentInfo.value) {
    return ElMessage({
      message: '内容不能为空'
    })
  }
  commentDto.value.blogId = blogId
  commentDto.value.content = commentInfo.value
  const { code, message } = await saveCommentById(commentDto.value)
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

function handleCommentTime(time: number) {
  dayjs.extend(relativeTime)
  var a = dayjs()
  var b = dayjs(time)
  return a.to(b)
}

const commentActive = ref('')
function replyComment(id) {
  commentChildrenActive.value = ''
  if (commentActive.value === id) {
    commentActive.value = ''
    return
  }
  commentActive.value = id
}

const commentChildrenActive = ref('')
function replyChildrenComment(id) {
  commentActive.value = ''
  if (commentChildrenActive.value === id) {
    commentChildrenActive.value = ''
    return
  }
  commentChildrenActive.value = id
}

async function childrenReply(item: commentModel, comment) {
  if (!childrenCommentInfo.value) {
    return ElMessage({
      message: '内容不能为空'
    })
  }
  commentDto.value.blogId = item.blogId
  commentDto.value.parentId = item.id || ''
  commentDto.value.parentName = item.userName || ''
  commentDto.value.parentAvatar = item.avatar || ''
  commentDto.value.rootId = item.id || ''
  commentDto.value.content = childrenCommentInfo.value
  if (comment) {
    commentDto.value.rootId = comment.id
  }
  const { code, message } = await saveCommentById(commentDto.value)
  if (code === 1) {
    ElMessage.success({
      message
    })
    childrenCommentInfo.value = ''
    commentActive.value = ''
    commentChildrenActive.value = ''
    init()
  } else {
    ElMessage.error({
      message
    })
  }
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
        <span>{{ totals }}条评论</span>
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
          resize="none"
        ></el-input>
      </div>
      <div style="text-align: right;border-bottom: 1px solid #ebeef5; padding-bottom: 20px;">
        <ui-button raised @click="saveComment(blogDetail?.id)">评论</ui-button>
      </div>
      <div v-for="comment in blogDetail?.commentList" :key="comment.id" class="comment-model">
        <el-avatar :size="42" :src="handleAvatar(comment.avatar)"></el-avatar>
        <div class="content-info">
          <div class="user">{{ comment.userName }}</div>
          <div class="content">{{ comment.content }}</div>
          <div class="time-edit">
            <div>{{ handleCommentTime(Number(comment.createdAt)) }}</div>
            <div>
              <ui-button
                v-if="comment.userId === userInfo?.id"
                @click="deleteComment(comment.id)"
              >删除</ui-button>
              <ui-button @click="replyComment(comment.id)">
                <span v-if="commentActive === comment.id ? false : true">
                  <el-icon>
                    <ChatLineRound />
                  </el-icon>回复
                </span>
                <span v-else>取消</span>
              </ui-button>
            </div>
          </div>
          <template v-for="item in comment.commentList">
            <div class="children-comment">
              <el-avatar :size="42" :src="handleAvatar(item.avatar)"></el-avatar>
              <div class="content-info">
                <div class="user">{{ item.userName }}</div>
                <div class="content">回复 {{ item.parentName }}：{{ item.content }}</div>
                <div class="time-edit">
                  <div>{{ handleCommentTime(Number(item.createdAt)) }}</div>
                  <div>
                    <ui-button
                      v-if="item.userId === userInfo?.id"
                      @click="deleteComment(item.id)"
                    >删除</ui-button>
                    <ui-button @click="replyChildrenComment(item.id)">
                      <span v-if="commentChildrenActive === item.id ? false : true">
                        <el-icon>
                          <ChatLineRound />
                        </el-icon>回复
                      </span>
                      <span v-else>取消</span>
                    </ui-button>
                  </div>
                </div>
                <div v-if="commentChildrenActive === item.id ? true : false">
                  <el-input
                    type="textarea"
                    placeholder="请输入回复内容"
                    v-model="childrenCommentInfo"
                    maxlength="100"
                    rows="5"
                    show-word-limit
                    resize="none"
                  ></el-input>
                  <div style="text-align: right;border-bottom: 1px solid #ebeef5; padding: 20px 0;">
                    <ui-button raised @click="childrenReply(item, comment)">确认回复</ui-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-if="commentActive === comment.id ? true : false">
            <el-input
              type="textarea"
              placeholder="请输入回复内容"
              v-model="childrenCommentInfo"
              maxlength="100"
              rows="5"
              show-word-limit
              resize="none"
            ></el-input>
            <div style="text-align: right;border-bottom: 1px solid #ebeef5; padding: 20px 0;">
              <ui-button raised @click="childrenReply(comment, null)">确认回复</ui-button>
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
