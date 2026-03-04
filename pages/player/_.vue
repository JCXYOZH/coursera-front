<template>
  <div>
    <video
      v-if="isAuthenticated"
      ref="videoPlayer"
      :src="videoUrl"
      controls
      autoplay
      style="width: 100%; height: 600px;"
      controlslist="nodownload"
      @contextmenu.prevent
      @dragstart.prevent
    >
      您的浏览器不支持 video 标签
    </video>
    <div v-else class="loading">
      {{ loadingText }}
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'  // 引入 js-cookie

export default {
  layout: 'video',

  data() {
    return {
      isAuthenticated: false,
      loadingText: '正在检查登录状态...',
    }
  },

  async asyncData({ params }) {
    return {
      videoPath: params.pathMatch,
    }
  },

  computed: {
    videoUrl() {
      if (!this.isAuthenticated) return ''
      return this.$config.BASE_URL + '/' + this.videoPath
    },
  },

  mounted() {
    this.checkAuth()
  },

  // 如果路由参数变化（如用户在已登录状态下点击另一个视频），重新检查
  watch: {
    '$route': 'checkAuth'
  },

  beforeDestroy() {
    if (process.client) {
      const video = this.$refs.videoPlayer
      if (video) {
        video.removeEventListener('dragstart', this.preventDrag)
      }
    }
  },

  methods: {
    checkAuth() {
      if (!process.client) return

      // ✅ 从 cookie 中读取 token（与登录页存储的 key 一致）
      const token = cookie.get('oes_token')
      // console.log('当前 token:', token)  // 调试

      if (!token) {
        this.loadingText = '请先登录'
        setTimeout(() => {
          // 跳转到登录页，并带上当前路径作为 redirect 参数
          this.$router.push('/login?redirect=' + encodeURIComponent(this.$route.fullPath))
        }, 1500)
        return
      }

      // token 存在，标记为已登录
      this.isAuthenticated = true
      this.$nextTick(() => {
        const video = this.$refs.videoPlayer
        if (video) {
          video.addEventListener('dragstart', this.preventDrag)
        }
      })
    },

    preventDrag(event) {
      event.preventDefault()
    },
  },
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  font-size: 18px;
  color: #666;
}
</style>
