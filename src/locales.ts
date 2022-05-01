import Vue from 'vue';
import VueI18n from 'vue-i18n';
import arEG from './locales/ar-EG.json';
import bnIn from './locales/bn-IN.json';
import enCA from './locales/en-CA.json';
import esMX from './locales/es-MX.json';
import frCA from './locales/fr-CA.json';
import hiIN from './locales/hi-IN.json';
import ptPT from './locales/pt-PT.json';
import ruRU from './locales/ru-RU.json';
import urPK from './locales/ur-PK.json';
import zhCN from './locales/zh-CN.json';

Vue.use(VueI18n);

const messages: any = {
    'ar-EG': arEG,
    'bn-IN': bnIn,
    'en-CA': enCA,
    'es-MX': esMX,
    'fr-CA': frCA,
    'hi-IN': hiIN,
    'pt-PT': ptPT,
    'ru-RU': ruRU,
    'ur-PK': urPK,
    'zh-CN': zhCN,
};

let lang = localStorage.getItem('lang');
if (!lang) {
    const navLang = navigator.language.substring(0, 2);
    const availableLanguages = Object.keys(messages).map(lang => lang.substring(0, 2));
    const index = availableLanguages.indexOf(navLang);
    if (index === -1) {
        lang = 'en-CA';
    } else {
        lang = Object.keys(messages)[index];
    }
} else if (Object.keys(messages).indexOf(lang) === -1) {
    lang = 'en-CA';
}

const i18n = new VueI18n({
	locale: lang,
	fallbackLocale: 'en-CA',
	messages,
});

const rtlLanguages = [
    'ar-EG',
    'ur-PK',
];

export {
    rtlLanguages
}

export default i18n;
