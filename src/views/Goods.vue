<template>
  <div>
    <div class="top">
      <div>
        <el-select v-model="nowMethod" placeholder="请选择搜索方法">
          <el-option
                  v-for="item in searchMethod"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
          </el-option>
        </el-select>
        <el-input v-model="prodeInformation" :placeholder="searchP"
                  style="width: 212px;margin:0 10px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="addGoods">添加商品</el-button>
    </div>
    <el-table :data="getList" border style="width: 100%;">
      <el-table-column prop="name" label="商品名称" width="210"></el-table-column>
      <el-table-column prop="desc" label="商品描述" width="310"></el-table-column>
      <el-table-column prop="price" label="商品价格 " width="210"></el-table-column>
      <el-table-column fixed="right" label="商品状态" width="210">
        <template slot-scope="scope">
          <el-button @click="changeStatus(scope.row,scope.$index)">{{scope.row.statusbutton}}</el-button>
          <el-tag
                  :type="type"
                  effect="plain">
            {{ scope.row.statusName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
        <template slot-scope="scope">
          <el-button @click="details(scope.row)" type="text">详情</el-button>
          <el-button @click="changeProduce(scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="7"
            :total="getTotal"
            @current-change="changepage"
    >
    </el-pagination>
  </div>
</template>

<script>
  import {mapActions} from  "vuex";
export default {
  data(){
    return{
      type:"",
      produceStatusName:"上架",
      formLabelWidth: "120px",
      searchMethod: [
        {
          _id: "orderId",
          name: "按照名称搜索"
        },
        {
          _id: "recipient",
          name: "按照描述搜索"
        },
      ],
      nowMethod: "",
      searchP: "",
      prodeInformation:"",
      isproductName:"T",
    }
  },
  watch:{
    nowMethod(newval){
      switch(newval){
        case "orderId":this.searchP = "请输入商品名称"; this.isproductName = "T";break
        case "recipient":this.searchP = "请描述商品";this.isproductName = "F";break
      }
    },
  },
  mounted() {
    this.getGoodsList({
      pageNum: 1,
      pageSize: 7,
    })
  },
  methods: {
    ...mapActions(["getGoodsList","searchGood","ChangeStatus","setProduceDetails"]),
    changepage(page) {
      this.getGoodsList({
        pageNum: page,
        pageSize: 7,
      })
    },
    changeStatus(row,idx) {
      this.ChangeStatus({
        productId:row._id,
        status:row.status == 1 ? 0 : 1,
        idx:idx,
      })
      // this.$store.commit("")
    },
    details(row) {
      new Promise((resolve) =>{
        this.setProduceDetails({
          id:row.pCategoryId,
          categoryId:row.categoryId,
          row,
        })
        resolve()
      })
      .then(() => {})
      this.$router.push("/index/GoodsDetails")
    },
    changeProduce(row) {
      this.$router.push({
        path:"/index/ProductContent",
        query:{
          type:"modify",
          data:row
      }
      })
    },
    handleSearch() {
      this.searchGood({
        pageNum:1,
        pageSize:7,
        productName:this.prodeInformation,
        productDesc:this.prodeInformation,
        url:"/manage/product/search?pageNum=1&pageSize=7&productName="+this.isproductName,
      })
    },
    addGoods(){
      this.$router.push({
        path:"/index/ProductContent",
        query:{
          type:"add",
        }
      })
    }
  },
  computed:{
    getList(){
      return this.$store.state.app.produceList
    },
    getTotal(){
      return this.$store.state.app.producTotal
    },
  }
};
</script>

<style scoped>
  .top{
    display: flex;
    justify-content:space-between;
    margin:10px 0
  }
</style>
