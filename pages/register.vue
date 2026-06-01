<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[
            { required: true, message: '请输入你的昵称', trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="params.nickname"
            />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>
        <!-- validator:自定义规则 -->
        <el-form-item
          class="input-prepend restyle no-radius"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="手机号"
              v-model="params.mobile"
            />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]"
        >
          <div
            style="width: 100%; display: block; float: left; position: relative"
          >
            <el-input type="text" placeholder="验证码" v-model="params.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div
            class="btn"
            style="position: absolute; right: 0; top: 6px; width: 40%"
          >
            <a
              @click.prevent="getVerificationCode"
              :class="['code-btn', { disabled: !sliderSuccess || !sending }]"
            >
              {{ codeTest }}
            </a>
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="设置密码"
              v-model="params.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <el-form-item>
          <div class="slider-container">
            <div
              class="slider-track"
              :class="{ success: sliderSuccess }"
              ref="sliderTrack"
            >
              <div
                class="slider-progress"
                :style="{ width: sliderLeft + 'px' }"
              ></div>

              <div
                class="slider-button"
                :style="{ left: sliderLeft + 'px' }"
                @mousedown="startDrag"
              ></div>

              <span v-if="!sliderSuccess">
        向右滑动完成验证
      </span>
              <span v-else>
        验证成功 ✅
      </span>
            </div>
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()"
          />
        </div>
        <div class="btn">
          <input
            type="button"
            class="return-home-page-button"
            value="返回首页"
            @click="returnHomePage()"
          />
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守
          <br />
<!--          <a target="_blank" href="#">用户协议</a>-->
          <a href="#">用户协议</a>
          和
<!--          <a target="_blank" href="#">隐私政策</a>-->
          <a href="#">隐私政策</a>
          。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <!--href="http://localhost:8160/api/ucenter/wx/userLogin"-->
      <div class="more-sign">
        <h6>社交帐号直接登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://localhost:8160/api/ucenter/wx/userLogin"
            ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#" @click.prevent="showQQTip"
            ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import registerAPI from "@/api/register";

export default {
  layout: "sign",

  data() {
    return {
      params: {
        mobile: "",
        code: "",
        nickname: "",
        password: "",
      },

      mobileExist: false,
      sending: true,
      registerLoading: false,
      codeTest: "获取验证码",
      cooldownKey: "smsCooldownEndTime",

      sliderLeft: 0,
      sliderSuccess: false,
      dragging: false
    };
  },

  mounted() {
    this.restoreCooldown();
  },

  methods: {

    // ✅ 恢复冷却状态
    restoreCooldown() {
      const endTime = localStorage.getItem(this.cooldownKey);
      if (!endTime) return;

      const now = new Date().getTime();

      if (now < parseInt(endTime)) {
        this.sending = false;
        this.codeTest = "冷却中，已发送";
      } else {
        localStorage.removeItem(this.cooldownKey);
      }
    },

    /*// ✅ ✅ ✅ 关键修复在这
    checkPhone(rule, value, callback) {

      if (!value) {
        return callback(new Error("请输入手机号码"));
      }

      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }

      // ✅ 一定要 return Promise
      return registerAPI.checkMobile(value)
        .then(response => {

          const isRegistered = response.data.data.isRegistered;

          if (isRegistered) {
            this.mobileExist = true;
            callback(new Error("手机号已注册"));
          } else {
            this.mobileExist = false;
            callback();
          }
        })
        .catch(() => {
          callback(new Error("手机号校验失败"));
        });
    },*/
    checkPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }

      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }

      return registerAPI.checkMobile(value)
        .then(response => {
          console.log("checkMobile response:", response);

          // 兼容后端可能的两种数据结构
          // 情况 A: response.data.data.isRegistered
          // 情况 B: response.data.isRegistered
          // 情况 C: response.data.data
          let isRegistered;
          if (response && response.data) {
            if (typeof response.data.isRegistered === "boolean") {
              isRegistered = response.data.isRegistered;
            } else if (
              response.data.data &&
              typeof response.data.data.isRegistered === "boolean"
            ) {
              isRegistered = response.data.data.isRegistered;
            } else if (typeof response.data.data === "boolean") {
              isRegistered = response.data.data;
            }
          }

          // 回退保守值，确保在拿不到 isRegistered 时不报错
          if (typeof isRegistered !== "boolean") {
            // 如果后端没有明确返回 isRegistered，默认为未注册，以便继续流程
            isRegistered = false;
          }

          if (isRegistered) {
            this.mobileExist = true;
            callback(new Error("手机号已注册"));
          } else {
            this.mobileExist = false;
            callback();
          }
        })
        .catch(error => {
          console.error("checkMobile error:", error);
          callback(new Error("手机号校验失败"));
        });
    },

    getVerificationCode() {

      if (!this.sliderSuccess) {
        this.$message.warning("请先完成滑块验证");
        return;
      }

      if (!this.sending) return;

      if (this.mobileExist) {
        this.$message.error("该手机号已注册");
        return;
      }

      this.$refs.userForm.validateField("mobile", (errMsg) => {

        if (!errMsg) {

          registerAPI.sendVerificationCode(this.params.mobile)
            .then(() => {

              this.$message.success("验证码发送成功");

              this.sending = false;
              this.codeTest = "冷却中，已发送";

              const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
              localStorage.setItem(this.cooldownKey, endTime);
            })
            .catch(() => {
              this.$message.error("发送失败");
            });
        }
      });
    },

    submitRegister() {

      if (!this.sliderSuccess) {
        this.$message.warning("请先完成滑块验证");
        return;
      }

      if (this.registerLoading) return;

      this.$refs.userForm.validate((valid) => {

        if (valid) {

          this.registerLoading = true;

          registerAPI.submitRegister(this.params)
            .then(() => {

              this.$message.success("注册成功");

              this.$router.push({ path: "/login" });

            })
            .finally(() => {
              this.registerLoading = false;
            });
        }
      });
    },

    startDrag(event) {
      if (this.sliderSuccess) return;

      this.dragging = true;

      const startX = event.clientX;
      const startLeft = this.sliderLeft;

      const track = this.$refs.sliderTrack;
      const maxWidth = track.offsetWidth - 40; // 动态计算

      const move = (e) => {
        if (!this.dragging) return;

        const moveX = e.clientX - startX;
        let newLeft = startLeft + moveX;

        if (newLeft >= maxWidth) {
          this.sliderLeft = maxWidth;
          this.sliderSuccess = true;
          this.dragging = false;

          this.$message.success("滑块验证成功");

          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        } else if (newLeft > 0) {
          this.sliderLeft = newLeft;
        }
      };

      const up = () => {
        if (!this.sliderSuccess) {
          this.sliderLeft = 0;
        }
        this.dragging = false;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },

    returnHomePage() {
      window.location.href = "/";
    },

    showQQTip() {
      this.$message.info('功能开发中，敬请期待！');
    },
  },
};
</script>


<style scoped>
.el-form-item__error {
  z-index: 9999999;
}

.return-home-page-button {
  margin-top: 20px;
  width: 100%;
  padding: 9px 18px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  background-color: #31d071;
  cursor: pointer;
}

.slider-container {
  width: 100%;
}

.slider-track {
  position: relative;
  height: 40px;
  background: #e4e7ed;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  color: #909399;
  user-select: none;
  overflow: hidden;
  transition: background 0.3s;
}

/* 成功时整条变绿 */
.slider-track.success {
  background: #67c23a;
  color: #fff;
}

/* 拖动中的进度条 */
.slider-progress {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #409eff, #66b1ff);
  border-radius: 20px;
  transition: width 0.1s;
}

/* ✅ 成功后隐藏蓝色进度 */
.slider-track.success .slider-progress {
  display: none;
}

.slider-button {
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  z-index: 2;
}

.code-btn {
  color: #409eff;
  cursor: pointer;
}

/*.code-btn {
  color: #31d071;
  font-weight: 500;
  transition: all 0.2s;
}

.code-btn:hover {
  color: #2bbf66;
}*/

.code-btn.disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}

</style>
