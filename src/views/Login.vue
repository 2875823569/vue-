<template>
  <div class="login_box">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="login-box">
          <h3>用户登陆</h3>
          <el-form
            status-icon
            class="demo-ruleForm"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                type="text"
                autocomplete="off"
                v-model="ruleForm.username"
              >
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                type="password"
                autocomplete="off"
                v-model="ruleForm.password"
              >
                <i slot="prefix" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../utils/request";

export default {
  data() {
    return {
      ruleForm: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //数据校验的方法
        const loading = this.$loading({
          lock: true,
          text: "登陆中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        if (valid) {
          //发请求跳转页面
          axios
            .post("/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              if (!res.data.status) {
                localStorage["username"] = this.ruleForm.username;
                this.$router.replace("/index/home");
                this.$store.commit("UPDATE_INFO", {
                  data: res.data.data,
                  token: res.data.token,
                });
              } else {
                this.$message.info(res.data.msg);
              }
            });
        } else {
          //

          this.$message.error("请正确填写!");
        }

        loading.close();
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login_box {
  background-image: url("../assets/image/login.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 50px;
  box-sizing: border-box;
}

.el-col-6 {
  width: 50%;
}

.el-row {
  background-color: #f5f5f599;
  width: 400px;
  height: fit-content;
  height: 250px;
}

h3 {
  line-height: 40px;
}

.el-input__inner {
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: black;
}
</style>
