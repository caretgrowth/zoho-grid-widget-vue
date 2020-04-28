import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { ZOHO } from "./assets/ZohoEmbededAppSDK.min.js";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  el: "#grid",
  store: store,
  render: h => h(App),
  created: function() {
    /* Initial Load Sequence
      1-Page Loads w/Entity 
      2-Fetch Related Record Details (Triggered by watch)
      3-Fetch API data based on record (Triggered by watch)

      All future calls can be made independently utilizing the Store
    */
    this.$store.dispatch("setEntity");
    ZOHO.embeddedApp.init();
  }
});
