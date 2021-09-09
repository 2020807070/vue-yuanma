
let Vue;

class Store {
  constructor(options) {
    this.options = options;
    this._vm = new Vue({
      data: {
        $$state: options.state, // 加上两个$，就不会代理
      },
    });

  }

  get state () {
    return this._vm._data.$$state;
  }

  set state (v) {
    console.error("请使用replaceState()重置状态");
  }
}



function install (_Vue) {
  Vue = _Vue;

  Vue.mixin({
    // 这个地不太懂
    beforeCreate () {
      if (this.$options.store) {
        // options 哪里来的
        console.log('store', this.$options.store);
        Vue.prototype.$store = this.$options.store;
      }
    }
  })
}
export default { Store, install };