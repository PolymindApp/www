import Vue  from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import i18n, { rtlLanguages } from './locales'
import vuetify from '@/plugins/vuetify'
import Error from '@/utils/Error'
import Modal from '@/utils/Modal'
import Confirm from '@/utils/Confirm'
import Snack from '@/utils/Snack'
import globalVariables from './global'
import router from '@/router/index'
import '@mdi/font/scss/materialdesignicons.scss'
import './index.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Confirm)
Vue.use(Error)
Vue.use(Modal)
Vue.use(Snack)

vuetify.preset.rtl = rtlLanguages.indexOf(i18n.locale) !== -1;

new Vue({
    router,
    vuetify,
    i18n,
    data: globalVariables,
    render: (h) => h(App),
}).$mount('#app');
