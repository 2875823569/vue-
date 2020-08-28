<template>
  <div>
    <div class="top">
      <div>
        <el-input placeholder="请输入内容" v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="Gosearch"
          >搜索
        </el-button>
      </div>
      <el-button type="primary" @click="handleaddSpecification"
        >+ 添加规格
      </el-button>
    </div>
    <el-table :data="goodsType" style="width: 100%;" :border="true">
      <el-table-column label="规格名称" width="350">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格属性值" width="350">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                >{{ [...scope.row.option].join(",") }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="规格分类" width="350">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.typeName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作选项">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-select
            v-model="form.typeName"
            clearable
            placeholder="请选择分类"
            @change="changeChoice"
          >
            <el-option
              v-for="item in goodsTypeOne"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <!--          <el-input autocomplete="off" v-model="form.typeName"></el-input>-->
        </el-form-item>
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            v-model="form.specificationName"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select
            v-model="Attributes"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择属性"
          >
            <el-option
              v-for="item in AttributesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="changeChoice"
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
      title: "",
      ischeck: true,
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        delivery: true,
        typeName: "",
        specificationName: "",
        nowdata: {},
      },
      Attributes: [],
      AttributesOptions: [],
      typeOptions: [],
      formLabelWidth: "120px",
      nowID: "",
    };
  },
  mounted() {
    this.getSpecificationList({
      pageSize: 7, //每页数据量
      pageNum: 1, // 当前页码
    });
    this.getGoodsType({
      parentId: 0,
      pageNum: 1,
      // pageSize: 0,
    });
    this.typeOptions = this.goodsTypeOne;
  },
  methods: {
    ...mapActions([
      "getSpecificationList",
      "changeSpecification",
      "deletSpecification",
      "searchSpecification",
      "getGoodsType",
      "addSpecification",
    ]),
    changepage(page) {
      this.getSpecificationList({
        pageSize: 7, //每页数据量
        pageNum: page, // 当前页码
      });
    },
    submit() {
      if (this.ischeck) {
        this.changeSpecification({
          _id: this.form.nowdata._id,
          name: this.form.specificationName,
          category_id: this.nowID,
          option: this.Attributes,
        });
      } else {
        this.addSpecification({
          name: this.form.specificationName,
          c_id: this.nowID,
          option: this.Attributes,
        });
      }
      this.getSpecificationList({
        pageSize: 7, //每页数据量
        pageNum: 1, // 当前页码
      });
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.title = "修改规格";
      this.ischeck = true;
      this.form.nowdata = row;
      this.form.Attributes = row.option.join(",");
      this.dialogFormVisible = true;
      this.AttributesOptions.length = 0;
      row.option.forEach((item) => {
        this.AttributesOptions.push({
          value: item,
          label: item,
        });
      });
      this.Attributes = row.option;
      console.log(index, row);
    },
    handleDelete(row) {
      this.deletSpecification({
        _id: row._id,
      });
      console.log(row);
    },
    Gosearch() {
      this.searchSpecification({
        value: this.search,
        pageSize: 7,
        pageNum: 1,
      });
    },
    changeChoice(id) {
      this.nowID = id;
    },
    handleaddSpecification() {
      this.title = "添加规格";
      this.ischeck = false;
      this.dialogFormVisible = true;
    },
  },
  computed: {
    goodsTypeOne() {
      return this.$store.state.app.goodsType;
    },
    goodsType() {
      return this.$store.state.app.SpecificationList;
    },
    gettotal() {
      return this.$store.state.app.Specificationtotal;
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
}

.top > div {
  display: flex;
}

.top > div > button {
  margin-left: 20px;
}

.el-select {
  width: 100% !important;
}
</style>
