// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index.js";
import utils from "./utils/utils.js";
import { Button } from "element-ui";
import "normalize.css";

Vue.config.productionTip = false;
Vue.use(utils);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
