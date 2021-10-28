import Vue from "vue";
import App from "./App";
import {Popup,Button,DatetimePicker,Field,Toast} from "vant"
// import 'vant/lib/index.css';
Vue.use(Popup)
Vue.use(Button)
Vue.use(DatetimePicker)
Vue.use(Field)
Vue.use(Toast)
Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
}).$mount("#app")