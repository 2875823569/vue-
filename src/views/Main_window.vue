<template>
  <div class="main">
    <div class="nav">

      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        background-color="#38a98775"
        router:true
        @select="select"
      ><div class="log">
        <img src="../../public/log.jpeg" alt="">
      </div>
        <el-menu-item index="/index/home">
          <i class="el-icon-menu"></i>
          首页
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            商品
          </template>
          <el-menu-item-group>
            <el-menu-item :index="path[1][0]">
              <i class="el-icon-s-unfold"></i>
              品类管理
            </el-menu-item>
            <el-menu-item :index="path[1][1]">
              <i class="el-icon-s-goods"></i>
              商品管理
            </el-menu-item>
            <el-menu-item :index="path[1][2]">
              <i class="el-icon-caret-right"></i>
              规格属性
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            用户
          </template>
          <el-menu-item-group>
            <el-menu-item :index="path[2][0]">
              <i class="el-icon-user-solid"></i>
              用户管理
            </el-menu-item>
            <el-menu-item :index="path[2][1]">
              <i class="el-icon-view"></i>
              权限管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-release"></i>
            订单
          </template>
          <el-menu-item-group>
            <el-menu-item :index="path[3][0]">
              <i class="el-icon-box"></i>
              订单管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="top">
        <span class="title">后台管理系统</span>
        <div class="userinformation">
          <img src="../assets/logo.png" alt="" />
          <span>admin</span>
        </div>
        <div class="backlogin">
          <el-button type="primary" @click="backLogin">退出登陆</el-button>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      path: [
        [["/index/home"]],
        ["/index/Goodstype", "/index/Goods", "/index/Goodsspecification"],
        ["/index/UserManagement", "/index/Authority"],
        ["/index/Order"],
      ],
    };
  },
  methods: {
    backLogin() {
      this.$store.commit("DROP_INFO");
      this.$router.replace("/");
    },
    select(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 100vh;
  height: 100%;
}

.main {
  display: flex;
}
.top {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #f5f1f173;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
}
.userinformation {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-right: 20px;
}
.top img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.container {
  margin: 20px;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
  background-color: #f5f1f173;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}
  .log{
    width: 100%;
    height: 91px;
    color: greenyellow;
    font-size: 23px;
    display: flex;
  }
.log img{
  width: 100%;
  height: 91px;
}
  .title{
    font-size: 30px;
    width: 900px;
  }
</style>
