<template>
    <div>
        <el-page-header @back="goBack" content="订单详情">
        </el-page-header>
        <el-card class="box-card" body-style="{padding:'20px',width:'100%'}">
            <div  :key="1" class="text item">
                <el-tag>订单号</el-tag>{{getorderDetails.orderId}}
            </div>
            <div  :key="2" class="text item">
                <el-tag>订单人</el-tag>{{getorderDetails.recipient}}
            </div>
            <div  :key="3" class="text item">
                <el-tag>创建时间</el-tag>{{getorderDetails.create_time}}
            </div>
            <div  :key="4" class="text item">
                <el-tag>订单状态</el-tag>{{getorderDetails.status}}
            </div>
            <div  :key="5" class="text item">
                <el-tag>商品价格</el-tag>{{getorderDetails.allPrice}}
            </div>
            <div  :key="6" class="text item">
                <el-tag>支付方式</el-tag>{{getorderDetails.paymentMethod}}
            </div>
        </el-card>
        <el-table
                :data="getorderDetails.details"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="imgs[0]"
                    label="商品图片"
                    width="280">
                <img :src="getorderDetails.details[0].imgs" alt="加载失败">
            </el-table-column>
            <el-table-column
                    prop="info"
                    label="商品信息"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="数量"
                    width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        methods:{
            goBack(){
                this.$router.push("/index/Order")
            }
        },
        computed:{
            getorderDetails(){
                return this.$store.state.app.orderDetails
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
    .item[data-v-477e164e] {
        padding: 18px 0;
        text-align: left;
    }
    .box-card{
        width: 81vw !important;
    }
</style>