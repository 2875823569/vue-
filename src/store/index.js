import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";

// 加载所有模块。
function loadModules() {
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);

  const modules = context
    .keys()
    .map((key) => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    );

  return { context, modules };
}

const { context, modules } = loadModules();
console.log(modules);

Vue.use(Vuex);

//创建仓库

/*
   1.state,单一状态树 就是一个普通对象，用来真正存放数据的地方 
           可以直接通过 $store.state拿，一般把它映射成计算属性

   2.getters,相对与是state的派生数据 

   3.mutations, 是修改仓库数据的地方

   4.actions, 用来做异步的请求的地方，请求回来的数据再提交mutation

   5.module 分模块 

*/
const store = new Vuex.Store({
  modules: {
    app,
  },
});

if (module.hot) {
  // 在任何模块发生改变时进行热重载。
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();

    store.hotUpdate({
      modules,
    });
  });
}

export default store;
