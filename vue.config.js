const { defineConfig } = require("@vue/cli-service")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const IconsResolver = require("unplugin-icons/resolver")
const Icons = require("unplugin-icons/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
const path = require("node:path")
// 处理路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require("unplugin-element-plus/webpack")({
        // options
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
  // svg-sprite-loader 处理svg的配置项
  chainWebpack(config) {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js")
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icon")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
  },
  // webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中请求，转发(代理)到另外一个服务器上
  devServer: {
    proxy: {
      // 当地址中包含 /api 的时候触发此代理
      "/api": {
        target: "https://api.imooc-admin.lgdsunday.club/",
        changeOrigin: true,
      },
    },
  },
})
