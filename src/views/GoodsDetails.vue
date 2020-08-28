<template>
    <div>
        <el-page-header @back="goBack" content="订单详情"></el-page-header>
        <el-card class="box-card">
                <div class="text item">
                    <el-tag>商品名称</el-tag>{{produceDetails.name}}
                </div>
                <div class="text item">
                    <el-tag>商品描述</el-tag>{{produceDetails.desc}}
                </div>
                <div class="text item">
                    <el-tag>商品价格</el-tag>{{produceDetails.price}}
                </div>
                <div class="text item">
                    <el-tag>所属分类</el-tag>{{produceDetails.attrName}}
                </div>
                <div class="text item">
                    <el-tag>规格属性</el-tag>{{produceDetails.specAttr[0]}}:{{produceDetails.specAttr[0]}}
                </div>
                <div class="text item">
                    <el-tag>商品图片</el-tag>
                </div>
                <div class="text item">
                    <el-tag>商品详情</el-tag>
                    <p v-html="produceDetails.detail"></p>
                </div>
            </el-card>
    </div>

</template>

<script>
    export default {
        methods:{
            goBack(){
                this.$router.push("/index/Goods")
            }
        },
        computed:{
            produceDetails(){
                return this.$store.state.app.produceDetails
            }
        }
    }
</script>

<style scoped>
.text{
    text-align: left;
    margin:10px 0
}
.el-tag{
    margin-right: 10px;
}
</style>