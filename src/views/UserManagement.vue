<template>
  <div>
    <el-button
      type="primary"
      @click="handAdd"
      size="mini"
      style="float: left; margin-bottom: 7px;"
      >创建用户</el-button
    >
    <el-table :data="getUser" border style="width: 100%;">
      <el-table-column prop="username" label="用户名" width="210">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="210"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="210"> </el-table-column>
      <el-table-column prop="create_time" label="注册时间" width="210">
      </el-table-column>
      <el-table-column prop="name" label="权限角色" width="210">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" plain  type="primary" size="small"
          >修改</el-button
          >
          <el-button type="primary" plain  size="small" @click="handleDelet(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="7"
      :total="getUserTotal"
      @current-change="changepage"
    >
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          :label-width="formLabelWidth"
          style="text-align: left;"
        >
          <el-select
            v-model="form.role_name"
            clearable
            placeholder="请选择用户权限角色"
            @change="changeChoice"
          >
            <el-option
              v-for="item in getroles"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        nowid:"",
        name: "",
        pwd: "",
        phone: "",
        email: "",
        role_name: "",
      },
      roles: [],
      choice_roleId: "",
      title:"",
      ischange:true,

    };
  },
  watch:{
    choice_roleId(){
      let name = this.roles.filter((item) => {
        return item._id == this.choice_roleId;
      })
      this.form.role_name =  name?.[0]?.name;
    }
  },
  mounted() {
    this.getUserList({
      pageNum: 1,
      pageSize: 7,
    });
    this.roles = this.getroles;
  },
  methods: {
    ...mapActions(["getUserList","createUser","deletUser","changeUser"]),
    handleClick(row) {
      this.form.name = row.username;
      this.form.phone = row.phone;
      this.form.pwd = row.password;
      this.form.email = row.email;
      this.form.role_name = row.name;
      this.form.nowid = row._id;
      this.ischange = true;
      this.title="修改信息"
      this.dialogFormVisible = true;
    },
    changepage(page) {
      this.getUserList({
        pageNum: page,
        pageSize: 7,
      });
    },
    submit() {
      let vm = this
      let obj = {
        _id:this.nowid,
        username:this.form.name,
        password:this.form.pwd,
        phone:this.form.phone,
        email:this.form.email,
        role_id:this.choice_roleId,
        role_name:this.form.role_name,}
      if(!this.ischange){
        this.createUser(obj).then((obj) =>
        {
          if(!obj.status){
            vm.$message({
              type: "success",
              message: "添加成功",
            });
            vm.dialogFormVisible = false;
          }else{
            vm.$message({
              type: "添加失败",
              message: obj.msg,
            });
          }

        })
      }else {
        this.changeUser(obj).then((res) => {
          if (!res.status) {
            vm.$message("修改成功");
            vm.dialogFormVisible = false;
          } else {
            vm.$message("修改失败");
          }
        })
      }
    },
    changeChoice(id) {
      this.choice_roleId = id;
    },
    handleDelet(obj){
      this.deletUser({userId:obj._id})
    },
    handAdd(){
      this.dialogFormVisible = true;
      this.ischange = false;
      this.title = "创建新用户"
    }
  },
  computed: {
    getUser() {
      return this.$store.state.app.userlist;
    },
    getUserTotal() {
      return this.$store.state.app.usertotal;
    },
    getroles() {
      return this.$store.state.app.roles;
    },
  },
};
</script>

<style scoped></style>
