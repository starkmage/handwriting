/*
单例模式（Singleton Pattern）
✅ 概念
确保一个类只有一个实例，并提供一个全局访问点。

✅ 前端应用场景
管理全局状态（如配置对象）
数据缓存
*/

class GlobalConfig {
  static #instance = null;

  constructor() {
    if (GlobalConfig.#instance) {
      return GlobalConfig.#instance;
    }

    this.theme = 'dark';

    GlobalConfig.#instance = this;
  }

  static getInstance() {
    if (!GlobalConfig.#instance) {
      GlobalConfig.#instance = new GlobalConfig();
    }
    return GlobalConfig.#instance;
  }

  setTheme(theme) {
    this.theme = theme;
  }

  getTheme() {
    return this.theme;
  }
}

const globalConfig = GlobalConfig.getInstance();

export default globalConfig;
