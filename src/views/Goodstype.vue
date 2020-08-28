<template>
  <div>
    <div class="goods_top">
      <div>
        <el-button
          type="text"
          v-for="(item, idx) in typeLevel"
          :key="idx"
          @click="backPage(idx)"
          >{{ item }}</el-button
        >
      </div>
      <el-button type="info" @click="handleAddType">+ 添加分类</el-button>
    </div>
    <el-table :data="goodsType" style="width: 100%;">
      <el-table-column label="商品分类" width="800px">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="Changetype(scope.$index, scope.row._id)"
            >修改分类
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="SelectChild(scope.$index, scope.row)"
            >查看子分类
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="7"
      :total="gettotal"
      @current-change="changepage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      parentId: ["0"],
      typeLevel: ["商品分类列表"],
    };
  },
  mounted() {
    this.getGoodsType({
      parentId: this.parentId[this.parentId.length - 1],
      pageNum: 1,
      pageSize: 7,
    });
  },
  methods: {
    ...mapActions(["getGoodsType", "changeTypeName", "addType"]),
    changepage(page) {
      this.getGoodsType({
        parentId: this.parentId[this.parentId.length - 1],
        pageNum: page,
        pageSize: 7,
      });
    },
    //返回上级列表
    backPage(idx) {
      this.parentId.splice(idx + 1);
      this.typeLevel.splice(idx + 1);
      this.getGoodsType({
        parentId: this.parentId[this.parentId.length - 1],
        pageNum: 1,
        pageSize: 7,
      });
    },

    //修改子分类
    Changetype(idx, id) {
      this.$prompt("请输入品类名", "提示", {
        inputPattern: /\S/,
        inputErrorMessage: "名称不能为空",
      })
        .then(({ value }) => {
          this.changeTypeName({
            categoryName: value,
            categoryId: id,
          });
          this.$message({
            type: "success",
            message: "修改成功" + "当前名称为  " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //查看子分类
    SelectChild(idx, row) {
      this.getGoodsType({
        parentId: row._id,
        pageNum: 1,
        pageSize: 7,
      });
      this.parentId.push(row._id);
      this.typeLevel.push("| " + row.name);
    },

    //添加分类
    handleAddType() {
      this.$prompt("请输入品类名", "提示", {
        inputPattern: /\S/,
        inputErrorMessage: "名称不能为空",
      })
        .then(({ value }) => {
          this.addType({
            categoryName: value,
            parentId: this.parentId[this.parentId.length - 1],
          });
          this.$message({
            type: "success",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  computed: {
    goodsType() {
      return this.$store.state.app.goodsType;
    },
    gettotal() {
      return this.$store.state.app.typetotal;
    },
  },
};
</script>

<style scoped>
.cell {
  width: 70vw;
}
.goods_top {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
