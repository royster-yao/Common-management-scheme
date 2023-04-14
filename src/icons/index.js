// 导入所有的svg图标
// 完成 SvgIcon的全局注册
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

const svgReuire = require.context("./svg", false, /\.svg$/)
// 此时返回了一个require函数,可以接受一个request的参数,用于require的导入
// 该函数提供了三个属性，可以通过 SvgReuire.key() 获得所有的svg图标
// 遍历图标，把图标作为 request 参数传入到 SvgReuire 导入函数中,完成本地svg图标的导入
svgReuire.keys().forEach((svgIcon) => svgReuire(svgIcon))

export default (app) => {
  app.component("svg-icon", SvgIcon)
}
