<template>
  <div>
    <el-tabs v-model="warehouseType" type="card" @tab-click="handleWarehouse">
      <el-tab-pane label="新增库存" name="新增库存">
        <el-form
          :model="addWarehouseFrom"
          :rules="rules"
          :inline="true"
          ref="addWarehouseFrom"
          label-width="90px"
          class="demo-addWarehouseFrom"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="">
                <el-form-item label="销售方式" prop="salesMethods">
                  <el-radio-group v-model="addWarehouseFrom.salesMethods">
                    <el-radio-button label="普通"></el-radio-button>
                    <el-radio-button label="称重销售"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="参与折扣" prop="isDiscount">
                  <el-radio-group v-model="addWarehouseFrom.isDiscount">
                    <el-radio-button label="参与"></el-radio-button>
                    <el-radio-button label="不参与"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="是否积分" prop="isIntegral">
                  <el-radio-group v-model="addWarehouseFrom.isIntegral">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品条码" prop="code">
                  <el-input
                    v-model="addWarehouseFrom.code"
                    class="inputW"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品名称" prop="commodityTitle">
                  <el-input
                    v-model="addWarehouseFrom.commodityTitle"
                    class="inputW"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品单位">
                  <el-select
                    v-model="addWarehouseFrom.commodityUnit"
                    placeholder="请选择商品单位"
                    filterable
                  >
                    <el-option
                      :label="item.type"
                      :value="item.type"
                      v-for="item in commodityUnitList"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                  <el-link
                    type="primary"
                    class="addBtn"
                    @click="addCommodity('商品单位')"
                    >新增</el-link
                  >
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品品牌">
                  <el-select
                    v-model="addWarehouseFrom.commodityBrand"
                    placeholder="请选择商品品牌"
                    filterable
                  >
                    <el-option
                      :label="item.type"
                      :value="item.type"
                      v-for="item in commodityBrandList"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                  <el-link
                    type="primary"
                    class="addBtn"
                    @click="addCommodity('商品品牌')"
                    >新增</el-link
                  >
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品类别">
                  <el-select
                    v-model="addWarehouseFrom.commodityType"
                    placeholder="请选择商品类别"
                    filterable
                  >
                    <el-option
                      :label="item.type"
                      :value="item.type"
                      v-for="item in commodityTypeList"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                  <el-link
                    type="primary"
                    class="addBtn"
                    @click="addCommodity('商品类别')"
                    >新增</el-link
                  >
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="">
                <el-form-item label="商品规格" prop="code">
                  <el-input
                    v-model="addWarehouseFrom.commoditySpecifications"
                    class="inputW"
                    placeholder="例如 50ml"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="进货价" prop="buyingPrice">
                  <el-input-number
                    v-model="addWarehouseFrom.buyingPrice"
                    class="inputW"
                    :precision="2"
                    :step="0.1"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="零售价" prop="retailPrice">
                  <el-input-number
                    v-model="addWarehouseFrom.retailPrice"
                    class="inputW"
                    :precision="2"
                    :step="0.1"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="会员价" prop="memberPic">
                  <el-input-number
                    v-model="addWarehouseFrom.memberPic"
                    class="inputW"
                    :precision="2"
                    :step="0.1"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="">
                <el-form-item label="库存" prop="stock">
                  <el-input
                    placeholder="请输入库存"
                    class="inputW"
                    v-model="addWarehouseFrom.stock"
                    type="number"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="毛利率">
                  <el-input
                    placeholder="0.00"
                    class="inputW"
                    v-model="addWarehouseFrom.grossProfitRate"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="有效期" prop="termOfValidity">
                  <el-input
                    placeholder="请输入有效期"
                    class="inputW"
                    v-model="addWarehouseFrom.termOfValidity"
                  >
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="">
                <el-form-item label="供货商" prop="supplier">
                  <el-input
                    v-model="addWarehouseFrom.supplier"
                    class="inputW"
                    placeholder="请输入供货商"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="">
                <el-form-item label="供货商电话" prop="supplier">
                  <el-input
                    v-model="addWarehouseFrom.supplierTel"
                    class="inputW"
                    placeholder="请输入供货商电话"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    class="inputW"
                    placeholder="请输入内容"
                    v-model="addWarehouseFrom.remark"
                    maxlength="300"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="">
                <el-form-item label="上传图片" prop="remark">
                  <span style="color: #999; font-size: 12px"
                    >只能上传jpg/png文件，且不超过500kb</span
                  >
                  <el-upload
                    ref="uploadFile"
                    class="upload-demo"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="onChange"
                    :http-request="uploadFile"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    action
                    accept=".png,.jpg,.jpeg"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="subBtn">
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('addWarehouseFrom')"
                    >立即创建</el-button
                  >
                  <el-button @click="resetForm('addWarehouseFrom')"
                    >重置</el-button
                  >
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="已入库存" name="已入库存" style="padding: 0px 20px">
        <el-form
          :inline="true"
          :model="addWarehouseFrom"
          class="demo-form-inline"
        >
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
                v-for="item in stockData"
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
            <el-slider
              v-model="searchFrom.termOfValidity"
              range
              :marks="marks"
              :max="2000"
              @change="sliderChange"
              style="width: 600px"
            >
            </el-slider>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="stockData"
          v-loading="tableLoading"
          border
          :row-class-name="tableRowClassName"
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
            <template slot-scope="scope">{{
              scope.row.commodityTitle
            }}</template>
          </el-table-column>
          <el-table-column
            label="销售方式"
            :filters="[
              { text: '普通', value: '普通' },
              { text: '称重销售', value: '称重销售' },
            ]"
            filter-placement="bottom-end"
            width="100"
          >
            <template slot-scope="scope"
              ><el-tag
                :type="
                  scope.row.salesMethods === '普通' ? 'primary' : 'success'
                "
                disable-transitions
                >{{ scope.row.salesMethods }}</el-tag
              ></template
            >
          </el-table-column>
          <el-table-column label="商品图片" width="100">
            <template slot-scope="scope">
              <el-image
                style="width: 30px; height: 30px"
                :src="
                  'http://127.0.0.1:7001/public/uploadFile/' + scope.row.imgUrl
                "
                alt="暂无图片"
                :preview-src-list="[
                  'http://127.0.0.1:7001/public/uploadFile/' + scope.row.imgUrl,
                ]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="库存数量" width="100">
            <template slot-scope="scope">{{
              scope.row.stock + " （ " + scope.row.commodityUnit + " ）"
            }}</template>
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
            <template slot-scope="scope">{{
              scope.row.grossProfitRate
            }}</template>
          </el-table-column>
          <el-table-column label="保质期（天）" width="110">
            <template slot-scope="scope">{{
              scope.row.termOfValidity
            }}</template>
          </el-table-column>
          <el-table-column label="商品规格" width="100">
            <template slot-scope="scope">{{
              scope.row.commoditySpecifications
            }}</template>
          </el-table-column>
          <el-table-column label="商品品牌" width="100">
            <template slot-scope="scope">{{
              scope.row.commodityBrand
            }}</template>
          </el-table-column>
          <el-table-column label="商品分类" width="100">
            <template slot-scope="scope">{{
              scope.row.commodityType
            }}</template>
          </el-table-column>
          <el-table-column label="商品单位" width="80">
            <template slot-scope="scope">{{
              scope.row.commodityUnit
            }}</template>
          </el-table-column>
          <el-table-column
            label="销售方式"
            :filters="[
              { text: '参与', value: '参与' },
              { text: '不参与', value: '不参与' },
            ]"
            filter-placement="bottom-end"
            width="100"
          >
            <template slot-scope="scope"
              ><el-tag
                :type="scope.row.isDiscount === '参与' ? 'success' : 'danger'"
                disable-transitions
                >{{ scope.row.isDiscount }}</el-tag
              ></template
            >
          </el-table-column>
          <el-table-column
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
          </el-table-column>
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
            <template slot-scope="scope">{{
              scope.row.ShoppingVoucher
            }}</template>
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
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :title="commodityName"
      width="40%"
      :visible.sync="dialogCommodity"
    >
      {{ commodityName }}：<input
        type="text"
        class="dialogInput"
        v-model="addCommodityType"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCommodity = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getType,
  addType,
  addCommodity,
  getStock,
  searchStock,
  uploadFile,
  delStock,
} from "@/api/commodity";
export default {
  name: "WarehouseIndex",
  watch: {
    addWarehouseFrom: {
      handler(val, old) {
        console.log(val.buyingPrice, val.retailPrice);
        if (
          val.buyingPrice &&
          val.retailPrice &&
          val.retailPrice != 0 &&
          val.buyingPrice != 0
        ) {
          console.log(val.buyingPrice, val.retailPrice);
          if (val.memberPic && val.memberPic != 0) {
            this.addWarehouseFrom.grossProfitRate = (
              ((val.retailPrice - val.memberPic) / val.memberPic) *
              100
            ).toFixed(2);
          } else {
            this.addWarehouseFrom.grossProfitRate = (
              ((val.retailPrice - val.buyingPrice) / val.retailPrice) *
              100
            ).toFixed(2);
          }
        }
      },
      deep: true, // true 深度监听
    },
  },
  data() {
    return {
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
      fileId: null, // 附件id
      disabled: false,
      tableLoading: false,
      searchFrom: {
        commodityTitle: "", // 商品名称
        termOfValidityEnd: "5000",
        termOfValidityStart: "0",
        isDelete: "0",
      },
      marks: {
        0: "0",
        365: "365",
        720: "720",
        1085: "1085",
        1445: "1445",
        2000: "2000",
      },
      stockData: [], // 获取库存
      commodityName: "商品类别",
      addCommodityType: "", // 新增的分类
      dialogCommodity: false,
      warehouseType: "新增库存",

      commodityUnitList: [], // 商品单位
      commodityTypeList: [], // 商品分类
      commodityBrandList: [], // 商品品牌
      fileList: [],
      addWarehouseFrom: {
        salesMethods: "普通",
        code: "",
        commodityUnit: "", // 商品单位
        commodityType: "", // 商品分类
        commodityBrand: "", // 商品品牌
        commoditySpecifications: "", // 商品规格
        buyingPrice: "", // 进货价
        retailPrice: "", // 零售价
        grossProfitRate: "", // 毛利率
        stock: "", // 库存
        termOfValidity: "", // 有效期
        isDiscount: "参与", // 参与折扣
        isIntegral: "是", // 是否积分
        commodityTitle: "", // 商品名称
        supplier: "", // 供货商
        memberPic: "", // 会员价
        remark: "", // 备注
        supplierTel: "", // 供应商电话
      },
      rules: {
        name: [{ required: true, message: "请输入商品条码", trigger: "blur" }],
        buyingPrice: [
          { required: true, message: "请输入进货价", trigger: "blur" },
        ],
        stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
        retailPrice: [
          { required: true, message: "请输入零售", trigger: "blur" },
        ],
        salesMethods: [
          { required: true, message: "请选择销售方式", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.initClassType();
    this.getStockList();
    this.scanCode();
  },
  methods: {
      scanCode() {
      let code = "";
      let lastTime, nextTime;
      let lastCode, nextCode;
      let that = this;
      window.document.onkeypress = function (e) {
        console.log("111111");
        if (window.event) {
          // IE
          nextCode = e.keyCode;
        } else if (e.which) {
          // Netscape/Firefox/Opera
          nextCode = e.which;
        }
        if (e.which === 13) {
          debugger;
          if (code.length < 3) return; // 手动输入的时间不会让code的长度大于2，所以这里只会对扫码枪有
          console.log(code);
          console.log("扫码结束");
          that.addWarehouseFrom.code = code;
          that.addSearch('扫码')
          // that.distinguishCode(code) // 获取到扫码枪输入的内容，做别的操作
          code = "";
          lastCode = "";
          lastTime = "";
          return;
        }
        nextTime = new Date().getTime();
        if (!lastTime && !lastCode) {
          console.log("扫码开始。。。");
          code += e.key;
        }

        if (lastCode && lastTime && nextTime - lastTime > 500) {
          // 当扫码前有keypress事件时,防止首字缺失
          console.log("防止首字缺失。。。");
          code = e.key;
        } else if (lastCode && lastTime) {
          console.log("扫码中。。。");
          code += e.key;
        }
        lastCode = nextCode;
        lastTime = nextTime;
      };
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isDelete == 1) {
        return "warning-row";
      }
      return "";
    },
    indexMethod(indedx) {
      return indedx + 1 + (this.pageNo - 1) * this.pageSize;
    },
    onChange(file, fileList) {
      this.fileList.push(file);
      console.log(file, fileList, "onChange");
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
        this.warehouseType = "新增库存";
        this.addWarehouseFrom = row;
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
            this.total = res.total;
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    initClassType() {
      getType().then((res) => {
        if (res.code == 0) {
          this.commodityTypeList = [];
          this.commodityUnitList = [];
          this.commodityBrandList = [];
          res.data.forEach((item) => {
            if (item.className == "商品类别") {
              this.commodityTypeList.push(item);
            }

            if (item.className == "商品单位") {
              this.commodityUnitList.push(item);
            }

            if (item.className == "商品品牌") {
              this.commodityBrandList.push(item);
            }
          });
        }
      });
    },
    dialogSubmit() {
      addType({
        className: this.commodityName,
        type: this.addCommodityType,
      }).then((res) => {
        if (res.code == 0) {
          this.msgSuccess(res.message);
          this.initClassType();
          this.addCommodityType = "";
          this.dialogCommodity = false;
        }
      });
    },
    addCommodity(type) {
      this.commodityName = type;
      this.dialogCommodity = true;
    },
    handleWarehouse(tab, e) {
      this.getStockList();
    },
    uploadFile(params) {
      const _file = params.file;
      let formDate = new FormData();
      formDate.append("id", this.fileId);
      formDate.append("file", _file);
      uploadFile(formDate).then((res) => {
        console.log(res);
        this.endSubmit(res);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCommodity(this.addWarehouseFrom).then((res) => {
            if (res.code == 0) {
              if (this.fileList.length > 0) {
                this.fileId = res.data.id;
                this.$refs.uploadFile.submit();
                return;
              }
              this.endSubmit(res);
            }
          });
        } else {
          return false;
        }
      });
    },
    endSubmit(res) {
      this.msgSuccess(res.message);
      if (this.addWarehouseFrom.id) {
        this.warehouseType = "已入库存";
      }

      this.getStockList();
      this.resetForm();
    },
    resetForm(formName) {
      this.fileList = [];
      this.addWarehouseFrom = {
        salesMethods: "普通",
        code: "",
        commodityUnit: "", // 商品单位
        commodityType: "", // 商品分类
        commodityBrand: "", // 商品品牌
        commoditySpecifications: "", // 商品规格
        buyingPrice: "", // 进货价
        retailPrice: "", // 零售价
        grossProfitRate: "", // 毛利率
        stock: "", // 库存
        termOfValidity: "", // 有效期
        isDiscount: "参与", // 参与折扣
        isIntegral: "是", // 是否积分
        commodityTitle: "", // 商品名称
        supplier: "", // 供货商
        memberPic: "", // 会员价
        remark: "", // 备注
      };
    },
  },
};
</script>
<style lang="scss" scoped>
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
.el-table__body .warning-row {
  background: red !important;
}
</style>
