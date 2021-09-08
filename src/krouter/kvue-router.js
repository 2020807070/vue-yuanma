// 1.实现一个插件
// 2.实现VueRouter: 处理选项、监控url变化，动态渲染

let Vue;

class VueRouter  {
  constructor (options) {
    // 1.处理选项
    this.$options = options;

    // 2.需要响应式的current
    const initial = window.location.hash.slice(1) || '/'

    Vue.util.defineReactive(this, 'current', initial)

    // usage:
    // Vue.util.defineReactive(obj,key,value,fn)
    
    // obj: 目标对象，
    // key: 目标对象属性；
    // value: 属性值
    // fn: 只在node调试环境下set时调用

    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}


VueRouter.install = function(_Vue) {
  Vue = _Vue;

   // 利用全局混入延迟调用后续代码
   Vue.mixin({
    beforeCreate() {
      // 任务1：挂载$router
      // 以后每个组件都会调用该方法
      console.log('$options.router', this.$options.router)
      if (this.$options.router) {
        // 此时的上下文this是当前组件实例
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      }
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    }
  })


  Vue.component('router-view', {
    render(h) {
      let Component = null
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        Component = route.component
      }
      return h(Component);
    }
  })
  
}

export default VueRouter;