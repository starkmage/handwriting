/*
单例模式（Singleton Pattern）
✅ 概念
确保一个类只有一个实例，并提供一个全局访问点。

✅ 前端应用场景
管理全局状态（如配置对象）
数据缓存
*/

class GlobalConfig {
  constructor() {
    if (GlobalConfig.instance) {
      return GlobalConfig.instance
    }

    this.apiBaseUrl = 'xxx'
    this.theme = 'dark'

    GlobalConfig.instance = this
  }

  setTheme(theme) {
    this.theme = theme
  }

  getTheme() {
    return this.theme
  }
}

const globalConfig = new GlobalConfig()
Object.freeze(globalConfig)
export default globalConfig

/*
use it

import config from './singleton'
console.log(config.getTheme());
*/