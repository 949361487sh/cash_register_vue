<template>
  <div>
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
            <el-form-item label="商品规格">
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
      </el-row>
      <el-row>
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
              <el-button type="primary" @click="submitForm('addWarehouseFrom')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('addWarehouseFrom')">重置</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
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
import { addCommodity, uploadFile, addType, getType } from "@/api/commodity";
export default {
  name: "Warehouse",
  props: {
    warehouseFrom: {
      type: Object,
    },
  },
  watch: {
    warehouseFrom: {
      handler(val) {
        if (JSON.stringify(val) != "{}" && val) {
          this.addWarehouseFrom = val;
        }
      },
      deep: true,
    },
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
    const validateBuyingPrice = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("进货价不能为0"));
      }
    };
    const validateRetailPrice = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("零售价不能为0"));
      }
    };
    return {
      commodityUnitList: [], // 商品单位
      commodityTypeList: [], // 商品分类
      commodityBrandList: [], // 商品品牌
      fileList: [],
      fileId: null, // 附件id
      commodityName: "商品类别",
      dialogCommodity: false,
      addCommodityType: "", // 新增的分类
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
        code: [{ required: true, message: "请输入商品条码", trigger: "blur" }],
        commodityTitle: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        buyingPrice: [{ validator: validateBuyingPrice, trigger: "blur" }],
        retailPrice: [{ validator: validateRetailPrice, trigger: "blur" }],
        stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
        salesMethods: [
          { required: true, message: "请选择销售方式", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.initClassType();
  },
  methods: {
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
    onChange(file, fileList) {
      this.fileList.push(file);
      console.log(file, fileList, "onChange");
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
    endSubmit(res) {
      this.msgSuccess(res.message || "新增成功");
      if (this.addWarehouseFrom.id) {
        this.warehouseType = "已入库存";
      }
      this.$emit("upList");
      this.resetForm();
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
    resetForm(formName) {
      this.fileList = [];
      delete this.addWarehouseFrom.id;
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
<style>
.subBtn {
  text-align: center;
}
</style>
