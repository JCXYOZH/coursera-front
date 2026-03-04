<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="天道酬勤">
            <img
              src="~/assets/img/logo.png"
              width="100%"
              alt="天道酬勤"
            />
          </a>
        </h1>
        <!-- 励志话语轮播区域 -->
        <div class="motto-container">
          <div class="motto-text">{{ currentMotto }}</div>
        </div>
        <div class="h-r-nsl">
          <!-- 固定路由跳转 -->
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <li><a href="https://42903e95.r16.vip.cpolar.cn">习题</a></li>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <!-- 判断是否显示用户信息 -->
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息" @click.prevent="showQQTip">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter/basic" title>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <img
                      :src="loginInfo.avatar && (loginInfo.avatar.startsWith('http') ? loginInfo.avatar : $config.BASE_URL + '/' + loginInfo.avatar)"
                      width="30"
                      height="30"
                      class="vam picImg"
                      alt
                    />
                    <span id="userName" class="vam disIb">{{
                      loginInfo.nickname
                    }}</span
                    ><i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      ><router-link :to="{ path: '/ucenter/basic' }"
                        >基本信息</router-link
                      ></el-dropdown-item
                    >
                    <el-dropdown-item>
                      <router-link :to="{ path: '/ucenter/password' }"
                        >修改密码</router-link
                      ></el-dropdown-item
                    >
                    <!-- 收藏课程 -->
                    <el-dropdown-item>
                      <router-link :to="{ path: '/ucenter/collect' }"
                        >收藏课程</router-link
                      >
                    </el-dropdown-item>
                    <!-- 学习记录 -->
                    <el-dropdown-item>
                      <router-link :to="{ path: '/ucenter/study' }"
                        >学习记录</router-link
                      >
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="logout()"
                class="ml5"
                >退出</a
              >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  name="queryCourse.courseName"
                  value
                />
                <button type="submit" class="s-btn" @click.prevent="showQQTip">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>

    <!-- /公共头引入 -->

    <!-- 加载pages目录文件 -->
    <nuxt />
    <!-- 加载pages目录文件 -->

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a
                href="https://github.com/JCXYOZH/"
                title="JCXYOZH"
                target="_blank"
                >JCXYOZH</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>联系邮箱：zhonghui_lin@qq.com</span>
                <span>Github：JCXYOZH</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2026 旧城新月</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>

<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";
import "~/assets/css/activity_tab.css";
import "~/assets/css/bottom_rec.css";
import "~/assets/css/nice_select.css";
import "~/assets/css/order.css";
import "~/assets/css/swiper-3.3.1.min.css";
import "~/assets/css/pages-weixinpay.css";

import cookie from "js-cookie";
import userAPI from "@/api/login";

export default {
  data() {
    return {
      token: "",
      loginInfo: {
        id: "",
        openid: "",
        mobile: "",
        password: "",
        nickname: "",
        sex: "",
        age: "",
        avatar: "",
      },
      // 励志话语列表
      mottoList: [
        "凡事趁早，没有那么多来日方长",
        "稍微不努力，就会被后者反超",
        "你始终欠自己一个努力的模样",
        "你羡慕的成绩背后都是你没熬过的苦",
        "一定要站在你所热爱的世界里闪闪发光",
        "上帝只会给挺过去的人考验",
        "从来只有拼出来的美丽，没有等出来的辉煌",
        "你要相信，你是被上帝选中的孩子",
        "你偷过的懒，都会在日后成为遗憾",
        "你只有非常努力，才能看起来毫不费力",
        "你未来的样子藏在你现在的努力里",
        "你要知道你讨厌的人也在努力",
        "半山腰总是挤的，你得去山顶看看",
        "同是风华正茂，何甘他人之后",
        "停下休息的时候，别忘了他人还在前行",
        "你总是书读的不多而想太多",
        "你可以迷茫，但请你不要虚度",
        "你需要的是一直变好，而不是一直后悔",
        "失败不是悲剧，放弃才是",
        "幸运是不存在的，努力才是硬道理",
        "我们各自努力，最高处见",
        "当你在夜晚孤军奋战 ，满天星光都因你而闪烁",
        "上岸的路是用卷子铺出来的",
        "你要暗自努力，然后惊艳所有人",
        "没死就不要把自己当成废物",
        "跌入低谷并不意味着要一直在那",
        "别说学习没用，是你没用",
        "阳光依然明亮，未来也会闪闪发光",
        "奇迹是努力的另外一个名字",
        "努力只能及格，拼命才会优秀",
        "没人嘲笑你的梦想，他们只是嘲笑你的实力",
        "不努力的人听到的永远是别人的好消息",
        "你一定要走，走到灯火通明",
        "我们没有退缩的选择，只有前进的使命",
        "要么出众，要么出局",
        "你只管努力，剩下的交给时间",
        "每一个优秀的人，都有一段沉默的时光",
        "最好的年纪，不要辜负最美的自己",
        "不努力的话，是会被合并同项的",
        "该来的都在路上了",
        "仅有一次的人生当然要活得比谁都炽热",
        "不去努力争取，那你连失败的资格都没有",
        "抬起头来做人，低下头来做事",
        "如果你想赢，这些都不算什么",
        "撑住，才有后来的一切",
        "总有一天，你的苦会照亮你走的路",
        "你所有的焦虑都来源于原地不动",
        "愿你以渺小启程以伟大结束",
        "别人能做到的事情，我也能做到",
        "生活的理想，是为了理想的生活",
        "尽管眼下十分困难，但日后必定会开花结果",
        "趁现在，一切都来得及",
        "你凭什么不努力，又什么都想得到",
        "受这些苦，一定是为了什么值得的东西",
        "比你差的人还没放弃，比你好的人还在努力",
        "不想被别人否定，自己就要更加努力",
        "世界那么大，我应该让父母去看看",
        "莫问前程凶吉，但求落幕无悔",
        "你不如现实一点，先把书读好",
        "努力是会上瘾的，特别是尝到甜头之后",
        "你多学一样本事，就少说一句求人的话",
        "你觉得这条路很难走的时候，一定是上坡路",
        "你要明白，学习不难，是你努力不够",
        "在破浪之前它需要沉淀",
        "不要让未来的你，讨厌现在的自己",
        "只要放弃一次，就会滋生放弃的习性",
        "我荒废了时间，时间便把我荒废了",
        "愿你相对辛苦，但绝对优秀",
        "抱怨身处黑暗，不如提灯前行",
        "没有人要求得了你输，除非你自己不想赢",
        "总不能把这个世界让给那些你讨厌的人吧",
        "你当然可以自欺欺人，但成绩不会无中生有",
        "你曾经也是第一名啊！",
        "总有人会赢，为什么不是我呢？",
        "能为梦想吃苦这是多么酷的一件事情啊",
        "你一定要优秀，去堵住那些悠悠众口",
        "不走心的努力，都是在敷衍自己",
        "自己想上的大学不能让给别人",
        "他们都假装颓废，你别上当",
        "越是一无所有，越要奋力一搏",
        "请不要假装努力，因为结局不会陪你演戏",
        "现在不玩命，将来命玩我",
        "任何值得到达的地方，都没有捷径",
        "老天明目张胆地不公平，但凡人保留偏执的权利",
        "今年很难，可我偏要考上",
        "当你觉得为时已晚的时候，恰恰是最早的时候",
        "累吗，累就对了，舒服是留给死人的",
        "世人皆苦，都在对抗，你也不能认输",
        "每一次努力，都是幸运的伏笔",
        "成功靠努力，爱拼才会赢",
        "学习给我压力，我必还你奇迹",
        "努力尽今夕，少年犹可夸",
        "哪个伟大的人不是从平凡中脱颖而出",
        "鸟欲高飞先振翅，人求上进先读书",
        "这世上哪有从天而降的运气，都是不为人知的努力",
        "身边比你优秀的人比你还努力",
        "该来的都在路上，早晚苦尽甘来",
        "考得上的，你可以的，绝对行的!"
      ],
      currentMotto: "",
      dayCheckInterval: null
    };
  },
  created() {
    //获取url中的token
    this.token = this.$route.query.token;
    //如果url中有token，表示采用微信登录
    if (this.token) {
      this.wxLogin();
    }
    //展示用户信息
    this.showUserInfo();

    // 初始化励志话语
    this.initMotto();
    // 启动每日检查
    this.startDayCheck();
  },
  beforeDestroy() {
    // 清除定时器
    if (this.dayCheckInterval) {
      clearInterval(this.dayCheckInterval);
    }
  },
  methods: {
    wxLogin() {
      if (this.token == "") return;

      //把token存入cookie中,token domain修改
      // cookie.set("oes_token", this.token, { domain: "localhost" });
      cookie.set("oes_token", this.token);

      //登录成功根据token获取用户信息
      userAPI.getUserInfo().then((response) => {
        this.loginInfo = response.data;
        //将用户信息存入cookie,token domain修改
        /*cookie.set("oes_ucenter", JSON.stringify(this.loginInfo), {
          domain: "localhost",
        });*/
        cookie.set("oes_ucenter", JSON.stringify(this.loginInfo));
      });
    },

    //右上角显示登录后的用户信息
    showUserInfo() {
      //从cookie中获取用户信息,从cookie中获取到的是字符串，而页面显示需要json
      // var userStr = "{'name' : 'wcd','age':'20'}"
      //采用JSON.parse将字符串转化为json  {'name' : wcd ,'age' : 20}
      var userStr = cookie.get("oes_ucenter");
      if (typeof userStr != "undefined" && userStr != "") {
        this.loginInfo = JSON.parse(userStr);
      }
    },

    //退出账号
    logout() {
      // domain 修改
      // cookie.set("oes_ucenter", "", { domain: "localhost" });
      cookie.set("oes_ucenter", "");
      cookie.set("oes_token", "");

      window.location.href = "/";
    },

    showQQTip() {
      this.$message.info('功能开发中，敬请期待！');
    },

    // 初始化励志话语
    initMotto() {
      // 获取当天日期（从2026-01-01开始的天数）
      const startDate = new Date('2026-01-01');
      const today = new Date();
      const diffTime = today - startDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // 计算当前应该显示哪句话（0-4）
      const mottoIndex = diffDays % this.mottoList.length;
      this.currentMotto = this.mottoList[mottoIndex];
    },

    // 更新到下一句励志话语
    updateToNextMotto() {
      const currentIndex = this.mottoList.indexOf(this.currentMotto);
      const nextIndex = (currentIndex + 1) % this.mottoList.length;
      this.currentMotto = this.mottoList[nextIndex];

      // 存储更新后的日期到localStorage，避免在同一天内重复更新
      const today = new Date().toDateString();
      localStorage.setItem('lastMottoUpdate', today);
    },

    // 启动每日检查
    startDayCheck() {
      // 每分钟检查一次是否到了新的一天
      this.dayCheckInterval = setInterval(() => {
        const now = new Date();
        const lastUpdate = localStorage.getItem('lastMottoUpdate');
        const today = now.toDateString();

        // 如果是凌晨0点且今天还未更新过
        if (now.getHours() === 0 && now.getMinutes() === 0 && lastUpdate !== today) {
          this.updateToNextMotto();
        }
      }, 60000); // 每分钟检查一次
    }
  },
};
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

/* 励志话语容器样式 */
.motto-container {
  margin: 10px 0 15px;
  padding: 10px 15px;
  //background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in;
  //text-align: center;
  /* 改为使用flex实现居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.motto-text {
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Microsoft YaHei', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: 5px 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .motto-container {
    margin: 8px 0 12px;
    padding: 8px 10px;
  }

  .motto-text {
    font-size: 16px;
  }
}

/* 适配原有布局的调整 */
#logo {
  margin-bottom: 5px;
}

.h-r-nsl {
  margin-top: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
