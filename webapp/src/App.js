import { router } from './Router';
import ElementUI from '../nodeApp/static/lib/vuejs/element-ui'

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.errorHandler = function (err, vm, info) {
  var msg = '[Vue Error] ' + (err && err.message) + ' | info: ' + info;
  var el = document.getElementById('app');
  if (el) {
    var errDiv = document.createElement('div');
    errDiv.style.cssText = 'padding:20px;color:red;font-size:14px;';
    errDiv.textContent = msg;
    el.appendChild(errDiv);
  }
};

window.onerror = function (msg, url, line, col, error) {
  var el = document.getElementById('app');
  if (el) {
    var errDiv = document.createElement('div');
    errDiv.style.cssText = 'padding:20px;color:red;font-size:14px;';
    errDiv.textContent = '[JS Error] ' + msg + ' at ' + line + ':' + col;
    el.appendChild(errDiv);
  }
};

new Vue({
  el: '#app',
  router,
});