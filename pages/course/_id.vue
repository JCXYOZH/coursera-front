<template>
  <div id="aCoursesList" class="bg-fa of" v-if="course && chapterList">
    <section class="container">

      <section class="path-wrap txtOf hLh30">
        <a href="/" class="c-999 fsize14">首页</a> \
        <a href="/course" class="c-999 fsize14">课程列表</a> \
        <span class="c-333 fsize14">{{ course.subjectName }}</span> \
        <span class="c-333 fsize14">{{ course.typeName }}</span> \
        <a href="#" class="c-999 fsize14">{{ course.title }}</a>
      </section>

      <!-- 课程封面 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box">
            <img
              :src="$config.BASE_URL + '/' + course.cover"
              :alt="course.title"
              class="dis c-v-pic myImg"
            />
          </section>
        </article>

        <!-- 右侧课程信息 -->
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>

            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px">
                ￥{{ course.price }}
              </b>
            </section>

            <section class="c-attr-mt">
              <span class="c-fff fsize14">
                主讲： {{ course.teacherName }}
              </span>
            </section>

            <!-- ✅ 顶部立即观看（使用第一节视频） -->
            <section
              class="c-attr-mt"
              v-if="(isbuyCourse || Number(course.price) == 0) && firstVideo"
            >
              <a
                :href="'/player/' + firstVideo.videoSourceId"
                class="comm-btn c-btn-3"
              >
                立即观看
              </a>
            </section>

            <section class="c-attr-mt" v-else>
              <a
                @click="createOrder()"
                href="#"
                class="comm-btn c-btn-3"
              >
                立即购买
              </a>
            </section>
          </section>
        </aside>

        <div class="clear"></div>
      </div>

      <!-- ✅ 课程大纲 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>

                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu class="lh-menu mt10 mr10">
                        <ul>
                          <li
                            v-for="chapter in chapterList"
                            :key="chapter.id"
                            class="lh-menu-stair"
                          >
                            <a href="javascript:void(0)">
                              {{ chapter.title }}
                            </a>

                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                v-for="video in chapter.children || []"
                                :key="video.id"
                                class="lh-menu-second ml30"
                              >
                                <!-- ✅ 安全判断 -->
                                <a
                                  v-if="isbuyCourse || Number(course.price) == 0"
                                  :href="
                                    video && video.videoSourceId
                                      ? '/player/' + video.videoSourceId
                                      : '#'
                                  "
                                  target="_blank"
                                  @click="
                                    video &&
                                      video.videoSourceId &&
                                      addStudyRecord(
                                        video.title,
                                        video.videoSourceId
                                      )
                                  "
                                >
                                  <span class="fr">
                                    <i class="free-icon vam mr10">
                                      立即观看
                                    </i>
                                  </span>
                                  {{ video.title }}
                                </a>

                                <a v-else @click="pleaseBuy">
                                  <span class="fr">
                                    <i
                                      class="free-icon vam mr10"
                                      style="background-color: red"
                                    >
                                      立即购买
                                    </i>
                                  </span>
                                  {{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
              </article>
            </div>
          </section>
        </article>
      </div>
    </section>
  </div>

  <!-- ✅ 加载中 -->
  <div v-else style="text-align: center; padding: 100px">
    加载中...
  </div>
</template>

<script>
import courseAPI from "@/api/edu/course";
import commentAPI from "@/api/edu/comment";
import orderAPI from "@/api/order/order";
import studyAPI from "@/api/edu/record";

export default {
  data() {
    return {
      courseId: "",
      course: null,
      chapterList: [],
      isbuyCourse: false,
      haveCollectCourse: false,
    };
  },

  computed: {
    // ✅ 自动获取第一节视频
    firstVideo() {
      if (!this.chapterList || this.chapterList.length === 0) return null;

      for (let chapter of this.chapterList) {
        if (chapter.children && chapter.children.length > 0) {
          return chapter.children[0];
        }
      }
      return null;
    },
  },

  created() {
    this.courseId = this.$route.params.id;
    this.initCourseInfo();
  },

  methods: {
    initCourseInfo() {
      courseAPI.getCourseInfo(this.courseId).then((response) => {
        this.course = response.data.courseUserInfoVO;
        this.chapterList = response.data.chapterAndVideoList || [];
        this.isbuyCourse = response.data.haveBuyCourse;
        this.haveCollectCourse = response.data.haveCollectCourse;
      });
    },

    createOrder() {
      orderAPI.createOrder(this.courseId).then((response) => {
        this.$router.push({ path: "/orders/" + response.data });
      });
    },

    pleaseBuy() {
      this.$message.warning("请购买课程");
    },

    addStudyRecord(videoName, videoSourceId) {
      if (!videoSourceId) return;

      studyAPI.addStudyRecord(
        this.course.teacherName,
        this.course.title,
        // this.course.cover,
        this.$config.BASE_URL + '/' + course.cover,
        videoName,
        videoSourceId,
        this.course.id
      );
    },
  },
};
</script>

<style scoped>
.myImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
