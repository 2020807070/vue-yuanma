
let Vue;

class Store {
  constructor(options) {
    this.options = options;
    this._mutations = options.mutations
    this._actions = options.actions

    this._vm = new Vue({
      data: {
        $$state: options.state, // 加上两个$，就不会代理
      },
    });


    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
    
  }

  get state () {
    return this._vm._data.$$state;
  }

  set state (v) {
    console.error("请使用replaceState()重置状态");
  }


  commit (type, payload) {
    const entry = this._mutations[type];
    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];
    entry(this, payload);
  }
}



function install (_Vue) {
  Vue = _Vue;

  Vue.mixin({
    // 这个地不太懂
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  })
}
export default { Store, install };