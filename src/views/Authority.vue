<template>
    <div>
        <el-button
                type="primary"
                @click="handAdd"
                size="mini"
                style="float: left; margin-bottom: 7px;"
        >创建用户
        </el-button
        >
        <el-table :data="getRole" border style="width: 100%;">
            <el-table-column prop="name" label="角色名称" width="210">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="210"></el-table-column>
            <el-table-column prop="auth_time" label="授权时间" width="210"></el-table-column>
            <el-table-column prop="auth_name" label="授权人" width="210">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
                <template slot-scope="scope">
                    <el-button @click="setAuthority(scope.row)" plain type="primary" size="small"
                    >设置权限
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="7"
                :total="getRoleTotal"
                @current-change="changepage"
        >
        </el-pagination>
        <el-dialog
                title="设置权限"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <div class="dialog_top">
                <el-button type="text" @click="dialogVisible = true">
                    当前设置角色:
                    <span>{{nowrole}}</span>
                </el-button>
            </div>
            <el-tree
                    v-if="treeShow"
                    :data="data"
                    show-checkbox
                    ref="tree"
                    node-key="id"
                    :default-checked-keys="defaultChecked"
                    :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
    <el-button @click="() => {dialogVisible = false; this.treeShow = false;}">取 消</el-button>
    <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                dialogFormVisible: false,
                dialogVisible: false,
                formLabelWidth: "120px",
                form: {
                    name: "",
                    create_time: "",
                    auth_time: "",
                    auth_name: "",
                },
                nowrole: "",
                menus: [
                    "/home",
                    "/goods",
                    "/category",
                    "/product",
                    "/spec",
                    "/users",
                    "/user",
                    "/role",
                    "/orders",
                    "/order",
                ],
                Chart: [],
                data: [
                    {
                        id: 1,
                        label: '首页',
                    },
                    {
                        id: 2,
                        label: '商品',
                        children: [{
                            id: 3,
                            label: '品类管理'
                        }, {
                            id: 4,
                            label: '商品管理'
                        },
                            {
                                id: 5,
                                label: '规格属性'
                            }]
                    },
                    {
                        id: 6,
                        label: '用户',
                        children: [{
                            id: 7,
                            label: '用户管理'
                        }, {
                            id: 8,
                            label: '权限管理'
                        }]
                    },
                    {
                        id: 9,
                        label: '订单',
                        children: [{
                            id: 10,
                            label: "订单管理"
                        }]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                defaultChecked: [],
                treeShow:false,
                nowRow:"",
            };
        },
        mounted() {
            this.getRoleList({
                pageNum: 1,
                pageSize: 7,
            })
        },
        methods: {
            ...mapActions(["getRoleList", "addRole","setAuthority_store"]),
            handAdd() {
                this.dialogFormVisible = true
                this.$prompt('添加角色', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '角色名不能为空'
                }).then(({value}) => {
                    this.addRole({
                        roleName: value
                    })
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            setAuthority(row) {
                this.nowRow = row;
                this.treeShow = true;
                this.nowrole = row.name;
                this.dialogVisible = true;
                let arr = []
                for (let i = 0; i < row.menus.length; i++) {
                    arr.push(this.menus.indexOf(row.menus[i])+1)
                }
                this.defaultChecked.splice(0,this.defaultChecked.length,...arr);

            },
            changepage(page) {
                this.getRoleList({
                    pageNum: page,
                    pageSize: 7,
                })
            },
            getCheckedKeys() {
                this.dialogVisible = false
                this.treeShow = false
                this.Chart.length = 0;
                let arr = this.$refs.tree.getCheckedKeys()
                arr.forEach((item) => {
                    this.Chart.push(this.menus[item - 1])
                })
                this.$nextTick(() => {
                    let date = new Date()
                    this.setAuthority_store({
                        _id:this.nowRow._id,
                        menus:this.Chart,
                        auth_time:date.getTime(),
                        auth_name:localStorage["username"],
                    })

                })
            }
        },
        computed: {
            getRole() {
                return this.$store.state.app.roleList
            },
            getRoleTotal() {
                return this.$store.state.app.roletotle
            }
        }
    };
</script>

<style scoped>
    .dialog_top {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
