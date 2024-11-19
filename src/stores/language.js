import { defineStore } from 'pinia';
import i18n from '@/i18n';

export const useLanguageStore = defineStore('language', () => {
  // 切换语言函数
  function changeLanguage(lang) {
    i18n.global.locale.value = lang;
    localStorage.setItem('language', lang); // 保存语言设置到 localStorage
  }

  return { changeLanguage };
});
