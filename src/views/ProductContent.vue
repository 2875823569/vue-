<template>
  <div>
    <div class="top">
      <el-button type="primary" icon="el-icon-back" plain @click="goBack">
        返回
      </el-button>
      {{ title }}
    </div>
    <div class="middle">
      <ul class="small">
        <li>
          <span>商品名称 </span>
          <el-input
            minlength="1"
            placeholder="请输入商品名"
            v-model="form.name"
            clearable
          >
          </el-input>
        </li>
        <li>
          <span>商品描述 </span>
          <el-input
            minlength="1"
            type="text"
            placeholder="请输入商品描述"
            v-model="form.desc"
            clearable
          >
          </el-input>
        </li>
        <li>
          <span>商品价格 </span>
          <el-input-number
            v-model="form.price"
            controls-position="right"
            :min="1"
            :max="10"
            style="width: 100%"
          >
          </el-input-number>
        </li>
        <li>
          <span>起始库存 </span>
          <el-input-number
            v-model="form.num"
            controls-position="right"
            :min="1"
            :max="10"
            style="width: 100%"
          >
          </el-input-number>
        </li>
        <li>
          <span>商品分类</span>
          <el-select v-model="typeCheck" placeholder="请选择">
            <el-option
              v-for="item in goosTyleLIst"
              :key="item._id"
              :label="item.name"
              :value="item._id"
              @click="change(item)"
            >
            </el-option>
            {{ typeCheck }}
          </el-select>
        </li>
        <ul>
          <li class="to_top">
            <span>规格</span>
            <div>
              <div
                v-for="(item, checkindex) in SpecificationList"
                :key="item._id"
                class="checkList"
              >
                <span>{{ item.name }}</span>
                <el-checkbox-group
                  v-model="checkList[checkindex]"
                  style="display: flex;align-content: center"
                >
                  <el-checkbox
                    v-for="(i, idx) in item.option"
                    :label="i"
                    :key="idx"
                    >{{ i }}</el-checkbox
                  >
                  <el-divider></el-divider>
                </el-checkbox-group>
              </div>
            </div>
          </li>
          <div class="clearfloat">
            <el-button @click="startPermutations" style="float: left"
              >添加</el-button
            >
          </div>
          <li>
            <el-table
              :data="resPermutations"
              border
              style="width: 100%"
              v-show="resPermutations.length"
            >
              <el-table-column
                v-for="(item, idx) in SpecificationList"
                fixed
                :property="`${idx}`"
                :label="item.name"
                width="150"
                :key="item._id"
              >
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleDelet(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </li>
          <li class="to_top">
            <span>商品图片</span>
            <el-upload
              action="http://118.24.25.7:5000/api/manage/img/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </li>
          <li>
            <UI></UI>
          </li>
          <el-button type="primary" style="float:left;">提交</el-button>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSpecificationById } from "../api/common";
import { getGoodsType } from "../api/common";
import UI from "./UI";

export default {
  data() {
    return {
      checkList: [],
      form: {
        id: "",
        categoryId: "",
        pCategoryId: "",
        name: "",
        desc: "",
        price: "",
        detail: "",
        imgs: "",
        num: 0,
        type: "",
        specAttr: "",
      },
      title: "",
      goosTyleLIst: "",
      typeCheck: "",
      SpecificationList: "",
      resPermutations: [],
      //图片
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getGoodsType();
    let row = this.$route.query;
    row.type == "modify" && this.setGoods(row);
  },
  watch: {
    typeCheck(newVla) {
      this.getSpecificationById({
        id: newVla,
      });
    },
  },
  mounted() {},
  methods: {
    //设置传递过来的商品数据
    setGoods(row) {
      this.form.categoryId = row.data.categoryId;
      this.form.desc = row.data.desc;
      this.form.name = row.data.name;
      this.form.price = row.data.price;
      this.form.specAttr = row.data.specAttr;
      this.form.id = row.data._id;
      this.form.detail = row.data.detail;
      this.type = row.type == "add" ? "添加商品" : "修改商品";
    },
    //返回商品界面
    goBack() {
      this.$router.push("/index/Goods");
    },
    //获取规格列表
    async getGoodsType() {
      let res = await getGoodsType({});

      this.goosTyleLIst = res.data.data.list;
    },
    //通过分类ID获取规格
    async getSpecificationById() {
      let res = await getSpecificationById({
        id: this.typeCheck,
      });
      let list = res.data.data;
      this.checkList.length = 0;
      this.checkList.length = list.length;
      this.checkList.fill([], 0, list.length);
      this.SpecificationList = list;
      this.form.pCategoryId = this.goosTyleLIst.filter((item) => {
        return this.typeCheck != item._id;
      })[0].parentId;
      this.form.categoryId = this.typeCheck;
    },
    //对选中的规格进行排列组合
    Permutations(chunks) {
      let res = [];
      let helper = function(chunkIndex, prev) {
        let chunk = chunks[chunkIndex];
        let isLast = chunkIndex === chunks.length - 1;
        for (let val of chunk) {
          let cur = prev.concat(val);
          if (isLast) {
            // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
            res.push(cur);
          } else {
            helper(chunkIndex + 1, cur);
          }
        }
      };

      // 从属性数组下标为 0 开始处理
      // 并且此时的 prev 是个空数组
      helper(0, []);

      return res;
    },
    //点击添加进行排列组和
    startPermutations() {
      this.resPermutations = [];
      this.resPermutations.splice(
        0,
        this.resPermutations.length,
        ...this.Permutations(this.checkList)
      );
    },
    //删除表格数据
    handleDelet(row) {
      this.resPermutations = this.resPermutations.filter((item) => {
        return item != row;
      });
    },
    //图片操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log();
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {},
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  components: {
    UI,
  },
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(23, 17, 17, 0.29);
}

.top {
  font-size: 26px;
}

.top > button {
  margin-right: 30px;
}

.middle ul {
  padding-right: 400px;
  box-sizing: border-box;
}

.middle ul li {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 10px 0;
}

.middle ul li > span {
  width: 80px;
  text-align: center;
}
.to_top {
  align-items: flex-start !important;
}

.checkList {
  width: 50%;
  display: flex;
}
</style>
