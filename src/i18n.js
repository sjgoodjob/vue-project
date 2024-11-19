import { createI18n } from 'vue-i18n';

// 导入语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';

const savedLocale = localStorage.getItem('language') || 'en';

// 创建 i18n 实例并配置选项
const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: savedLocale, // 默认语言
  fallbackLocale: 'en', // 如果找不到对应语言时使用的备用语言
  messages: {
    en,
    zh
  }
});

export default i18n;
