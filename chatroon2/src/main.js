import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueSocketio from 'vue-socket.io'; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:4000', //options object is Optional
  })
);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
