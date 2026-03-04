module.exports = {
  // ========== 切换为 SPA 模式 ==========
  // mode: 可选值 'universal'（默认，SSR模式） 或 'spa'（纯客户端渲染）
  // 设置为 'spa' 后，所有页面都在浏览器端渲染，不会在服务器端预渲染 HTML
  mode: 'spa',  // 关键配置：禁用 SSR，改为传统纯 SPA 客户端渲染

  /*// ========== 打包按需添加：设置路由基础路径 ==========
  router: {
    base: '/computer/',   // 让路由识别部署在 /computer/ 子路径下
    extendRoutes(routes, resolve) {
      // 添加一条路由：匹配 /computer.html，重定向到首页
      routes.push({
        name: 'computerHtmlRedirect',
        path: '/computer.html',
        redirect: '/'
      })
    }
  },*/

  publicRuntimeConfig: {
    // BASE_URL: 'http://localhost:8500'
    BASE_URL: 'https://404276cd.r16.vip.cpolar.cn'
  },

  // ========== 插件配置 ==========
  // 插件，plugins 为注册 Vue 插件的数组
  plugins: [
    {
      src: "~/plugins/nuxt-swiper-plugin.js", // 插件文件路径，~ 表示项目根目录
      ssr: false // 该插件只在客户端运行，不在服务端运行（因为 swiper 依赖浏览器的 DOM）
    }
  ],

  // ========== 全局 CSS 配置 ==========
  // css: 全局引入的 CSS 文件数组，这些样式会被应用到所有页面
  css: ["swiper/dist/css/swiper.css"],  // 引入 swiper 轮播组件的样式文件

  // ========== HTML head 配置 ==========
  /*
   ** Headers of the page
   */
  head: {
    // ========== 页面标题 ==========
    // 所有页面的默认标题，可在具体页面通过 head() 方法覆盖
    title: "知新堂",

    // ========== meta 标签配置 ==========
    meta: [
      // 字符编码设置为 UTF-8，避免中文乱码
      { charset: "utf-8" },

      // 响应式设计配置：设置视口宽度为设备宽度，初始缩放比例为 1
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // SEO 关键词配置
      {
        hid: "keywords",  // hid: Nuxt 内部唯一标识符，防止重复（head identifier）
        name: "keywords", // meta 标签的 name 属性
        content: // 关键词内容，用于搜索引擎优化
          "知新堂",
      },

      // SEO 描述配置
      {
        hid: "description", // 唯一标识符
        name: "description",  // meta 标签的 name 属性
        content:  // 网站描述，会显示在搜索引擎结果中
          "知新堂--平台官网",
      },
    ],

    // ========== link 标签配置 ==========
    link: [
      {
        rel: "icon", // 链接关系类型：网站图标
        type: "image/x-icon", // 图标文件类型
        href: "/favicon.ico"  // 图标文件路径（位于 static 目录下）
      },

    ],

  },

  // ========== 页面加载进度条配置 ==========
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"  // 设置页面切换时顶部进度条的颜色（绿色）
  },

  // ========== 构建配置 ==========
  /*
   ** Build configuration
   */
  build: {
    // ========== 扩展 Webpack 配置 ==========
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      // config: Webpack 配置对象
      // isDev: 是否为开发环境（true/false）
      // isClient: 是否为客户端构建（true/false，相对于服务端构建）

      // 仅在开发环境 且 客户端构建时执行
      if (isDev && isClient) {
        // 向 Webpack 配置中添加 ESLint 规则
        config.module.rules.push({
          enforce: "pre",  // 在其他 loader 之前执行（预处理）
          test: /\.(js|vue)$/,  // 正则匹配：对 .js 和 .vue 文件生效
          loader: "eslint-loader",  // 使用 eslint-loader 进行代码检查
          exclude: /(node_modules)/,  // 排除 node_modules 目录
        });
      }
    },
  },
};
