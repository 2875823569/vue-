//用来修改webpack的配置的 vue-cli这个工具的配置的

module.exports = {
  devServer: {
    proxy: "http://118.24.25.7:5000",
  },
  transpileDependencies: ["vue-echarts", "resize-detector"],
};
