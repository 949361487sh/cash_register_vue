<template>
  <div class="warehouseBox">
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-select
          v-model="searchFrom.commodityTitle"
          clearable
          placeholder="请选择商品名称"
          filterable
        >
          <el-option
            :label="item.commodityTitle"
            :value="item.commodityTitle"
            v-for="item in stockAllTitle"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select
          v-model="searchFrom.isDelete"
          placeholder="请选择"
          filterable
        >
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="item in isDeleteList"
            :key="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保质期区间">
        <el-input
          type="number"
          v-model="searchFrom.termOfValidity"
          @change="termOfValidityChange"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogWarehouseFormVisible = true"
          >新增商品 （ A ）</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="stockData"
      v-loading="tableLoading"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed="left"
        type="index"
        :index="indexMethod"
        width="50"
        label="序列"
      >
      </el-table-column>
      <el-table-column fixed="left" label="商品名称" width="150">
        <template slot-scope="scope">{{ scope.row.commodityTitle }}</template>
      </el-table-column>
      <el-table-column label="销售方式" width="100">
        <template slot-scope="scope"
          ><el-tag
            :type="scope.row.salesMethods === '普通' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.salesMethods }}</el-tag
          ></template
        >
      </el-table-column>
      <el-table-column label="商品图片" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="'http://127.0.0.1:7001/public/uploadFile/' + scope.row.imgUrl"
            alt="暂无图片"
            :preview-src-list="[
              'http://127.0.0.1:7001/public/uploadFile/' + scope.row.imgUrl,
            ]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" width="100">
        <template slot-scope="scope">
          {{ scope.row.stock }}
          <span v-if="scope.row.commodityUnit">{{
            "（ " + scope.row.commodityUnit + " ）"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零售价（元）" width="110">
        <template slot-scope="scope">{{
          parseFloat(scope.row.retailPrice).toFixed(2)
        }}</template>
      </el-table-column>
      <el-table-column label="会员价（元）" width="110">
        <template slot-scope="scope">{{
          parseFloat(scope.row.memberPic).toFixed(2)
        }}</template>
      </el-table-column>
      <el-table-column label="进货价（元）" width="110">
        <template slot-scope="scope">{{
          parseFloat(scope.row.buyingPrice).toFixed(2)
        }}</template>
      </el-table-column>
      <el-table-column label="毛利率（%）" width="110">
        <template slot-scope="scope">{{ scope.row.grossProfitRate }}</template>
      </el-table-column>
      <el-table-column label="保质期（天）" width="110">
        <template slot-scope="scope">{{ scope.row.termOfValidity }}</template>
      </el-table-column>
      <el-table-column label="商品规格" width="100">
        <template slot-scope="scope">{{
          scope.row.commoditySpecifications
        }}</template>
      </el-table-column>
      <el-table-column label="商品品牌" width="100">
        <template slot-scope="scope">{{ scope.row.commodityBrand }}</template>
      </el-table-column>
      <el-table-column label="商品分类" width="100">
        <template slot-scope="scope">{{ scope.row.commodityType }}</template>
      </el-table-column>
      <!-- <el-table-column label="商品单位" width="80">
        <template slot-scope="scope">{{ scope.row.commodityUnit }}</template>
      </el-table-column> -->
      <!-- <el-table-column
        label="参与积分"
        :filters="[
          { text: '是', value: '是' },
          { text: '否', value: '否' },
        ]"
        filter-placement="bottom-end"
        width="100"
      >
        <template slot-scope="scope"
          ><el-tag
            :type="scope.row.isIntegral === '是' ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.isIntegral }}</el-tag
          ></template
        >
      </el-table-column> -->
      <el-table-column label="供货商" width="100">
        <template slot-scope="scope">{{ scope.row.supplier }}</template>
      </el-table-column>
      <el-table-column label="供货商电话" width="100">
        <template slot-scope="scope">{{ scope.row.supplierTel }}</template>
      </el-table-column>

      <el-table-column label="条形码" width="150">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="购物券" width="100">
        <template slot-scope="scope">{{ scope.row.ShoppingVoucher }}</template>
      </el-table-column>
      <el-table-column label="备注" width="150">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, '编辑')" size="small"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.isDelete != 1"
            size="small"
            type="danger"
            @click="handleClick(scope.row, '禁用')"
            >禁用</el-button
          >
          <el-button
            v-else
            size="small"
            type="success"
            @click="handleClick(scope.row, '启用')"
            >启用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 30px auto 100px; text-align: center">
      <el-pagination
        background
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :current-page="pageNo"
        @size-change="sizeChange"
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="新增商品（ Esc退出 ）"
      width="100%"
      :fullscreen="true"
      :visible.sync="dialogWarehouseFormVisible"
      :destroy-on-close="true"
    >
      <warehouse @upList="upList" :warehouseFrom="addWarehouseFrom" />
    </el-dialog>
  </div>
</template>
<script>
import { searchStock, delStock } from "@/api/commodity";
import saoma from "@/components/saoma/index.js";
import warehouse from "@/components/warehouse/index";
import onKey from "@/components/onKey";
export default {
  name: "WarehouseIndex",
  components: { warehouse },
  mixins: [saoma, onKey],
  data() {
    return {
      dialogWarehouseFormVisible: false,
      addWarehouseFrom: {},
      isDeleteList: [
        {
          name: "全部",
          value: "2",
        },
        {
          name: "正常",
          value: "0",
        },
        {
          name: "禁用",
          value: "1",
        },
      ],
      total: 1000,
      pageNo: 1, // 当前页数
      pageSize: 10,

      tableLoading: false,
      searchFrom: {
        commodityTitle: "", // 商品名称
        termOfValidityEnd: "99999999",
        termOfValidityStart: "0",
        isDelete: "0",
      },
      stockData: [], // 获取库存
      stockAllTitle: [], // 所以库存标题
      warehouseType: "新增库存",
    };
  },
  created() {
    this.getStockList();
  },
  methods: {
    upList() {
      this.getStockList();
      this.dialogWarehouseFormVisible = false;
    },
    indexMethod(indedx) {
      return indedx + 1 + (this.pageNo - 1) * this.pageSize;
    },

    sizeChange(size) {
      console.log(size, "改变查询总条数");
      this.pageSize = size;
      this.getStockList();
    },
    currentChange(size) {
      console.log(size, "改变页数");
      this.pageNo = size;
      this.getStockList();
    },

    sliderChange(val) {
      this.searchFrom.termOfValidityStart = val[0];
      this.searchFrom.termOfValidityEnd = val[1];
    },
    searchSubmit() {
      this.pageNo = 1;
      this.getStockList();
    },
    handleClick(row, type) {
      if (type == "编辑") {
        this.dialogWarehouseFormVisible = true;

        this.$nextTick(() => {
          this.addWarehouseFrom = row;
        });
      }
      if (type == "禁用" || type == "启用") {
        const title =
          type == "启用"
            ? "确定要启用该商品?"
            : "禁用该商品后，收银查不到，但还可以点击启用恢复?";
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delStock({ id: row.id, isDelete: type == "启用" ? "0" : "1" }).then(
              (res) => {
                this.msgSuccess(`${type}成功`);
                this.getStockList();
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    getStockList() {
      this.tableLoading = true;
      searchStock({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        commodityTitle: this.searchFrom.commodityTitle,
        termOfValidityEnd: this.searchFrom.termOfValidityEnd,
        termOfValidityStart: this.searchFrom.termOfValidityStart,
        isDelete: this.searchFrom.isDelete,
      })
        .then((res) => {
          if (res.code == 0) {
            this.stockData = res.data;
            this.stockAllTitle = res.allTitle;
            this.total = res.total;
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    termOfValidityChange(val) {
      this.searchFrom.termOfValidityEnd = val == "" ? 99999999 : val;
      this.searchFrom.termOfValidityStart = 0;
    },

    handleWarehouse(tab, e) {
      this.getStockList();
    },
  },
};
</script>
<style lang="scss">
.warehouseBox {
  padding: 20px;
}
.dialogInput {
  padding: 5px;
  width: 200px;
}
.subBtn {
  margin: 0px auto;
  position: fixed;
  bottom: 10px;
  width: 100%;
  background: #fff;
  text-align: center;
  padding-top: 25px;
}
.inputW {
  width: 250px;
}
.addBtn {
  padding: 0px 9px;
  border: 1px solid;
}
.el-table .warning-row {
  background: red;
  color: #fff;
}
.el-table .warning-row:hover {
  color: rgb(41, 41, 41);
}
</style>
