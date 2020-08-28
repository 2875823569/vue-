<template>
    <div>
        <div class="top">
            <el-select v-model="nowMethod" placeholder="请选择搜索方法">
                <el-option
                        v-for="item in searchMethod"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                </el-option>
            </el-select>
            <el-input v-model="orderInformation" :placeholder="searchP"
                      style="width: 212px;margin:0 10px;"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="orderList" border style="width: 100%;">
            <el-table-column prop="orderId" label="订单号" width="210"></el-table-column>
            <el-table-column prop="recipient" label="收件人" width="210"></el-table-column>
            <el-table-column prop="status" label="订单状态 " width="210"></el-table-column>
            <el-table-column prop="allPrice" label="订单总价" width="210"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="210"></el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
                <template slot-scope="scope">
                    <el-button @click="details(scope.row)" type="text">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="7"
                :total="orderTotal"
                @current-change="changepage"
        >
        </el-pagination>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                formLabelWidth: "120px",
                searchMethod: [
                    {
                        _id: "orderId",
                        name: "按照订单号搜索"
                    },
                    {
                        _id: "recipient",
                        name: "按照收件人搜索"
                    },
                ],
                nowMethod: "",
                orderInformation: "",
                searchP: "",
                isOrderList:true,
            };
        },
        watch:{
            nowMethod(newval){
                switch(newval){
                    case "orderId":this.searchP = "请输入订单号"; break
                    case "recipient":this.searchP = "请输入收件人";break
                }
            },
        },
        mounted() {
            this.getOrderList({
                pageNum: 1,
                pageSize: 7,
            })
        },
        methods: {
            ...mapActions(["getOrderList","searchOrder"]),
            changepage(page) {
                if(this.isOrderList){
                    this.getOrderList({
                        pageNum: page,
                        pageSize: 7,
                    })
                }else{
                    this.searchOrder({
                        type:this.nowMethod,
                        value:this.orderInformation,
                        pageNum:1,
                        pageSize:7,
                    })
                }

            },
            details(row) {
                new Promise((resolve) => {
                    this.$store.commit("UPDATDETAIL",row);
                    resolve()
                }).then(() => {
                    this.$router.push("/index/OrderDetails")
                })

            },
            handleSearch(){
                this.isOrderList = false;
                this.searchOrder({
                    type:this.nowMethod,
                    value:this.orderInformation,
                    pageNum:1,
                    pageSize:7,
                })
            }
        },
        computed: {
            orderList() {
                return this.$store.state.app.orderList;
            },
            orderTotal() {
                return this.$store.state.app.orderTotal;
            }
        }
    };
</script>

<style scoped>
    .el-table_2_column_12 {
        border-bottom: none;
    }
    .top{
        display: flex;
        margin:10px 0;
    }
</style>
