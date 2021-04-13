<template>
  <div>
    <el-row>
      <el-col :span="9">
        <div class="selectCommodity" :style="{ height: bodyHeight + 'px' }">
          <div class="top">
            <span class="topName blod"> 客单 </span>
            <span class="topOdd blod">{{ oddNumbers }}</span>
            <span class="topSelect">已选 {{ selectShopingList.length }}</span>
          </div>
          <div class="oldBox" v-if="isOld">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="blod"
                  >上一单 <span>{{ oldOddNumbers }}</span></span
                >
                <el-button
                  @click="isOld = false"
                  style="float: right; padding: 3px 0"
                  type="text"
                  >关闭</el-button
                >
              </div>
              <div class="text item">
                <el-row :gutter="5">
                  <el-col :span="12"
                    ><div class="oldBoxConLeft">
                      <p><span>应收金额：</span>{{ oldFrom.receivablePic }}</p>
                      <p><span>实收金额：</span>{{ oldFrom.netReceipts }}</p>
                      <p><span>找零：</span>{{ oldFrom.giveChange }}</p>
                    </div></el-col
                  >
                  <el-col :span="12"
                    ><div class="oldBoxConRight">
                      <p>打印小票 Y</p>
                      <p>退款退货 U</p>
                    </div></el-col
                  >
                </el-row>
              </div>
            </el-card>
          </div>
          <div
            class="selectShopingCon"
            :style="{ height: bodyHeight - 110 + 'px' }"
          >
            <el-table :data="selectShopingList" style="width: 100%">
              <el-table-column type="index" width="20"> </el-table-column>
              <el-table-column
                prop="commodityTitle"
                align="center"
                label="商品名"
                min-width="150"
              >
              </el-table-column>
              <el-table-column label="数量" align="center" width="160">
                <template slot-scope="scope">
                  <el-input-number
                    size="small"
                    :min="1"
                    :max="100"
                    v-model="scope.row.number"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="pic" label="价格（元）">
                <template slot-scope="scope">
                  <span style="color: #ff6014; font-size: 18px"
                    >￥
                    {{ (scope.row.retailPrice * scope.row.number).toFixed(2) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="50">
                <template slot-scope="scope">
                  <i
                    class="el-icon-delete iconStyle"
                    @click="deleteShoping(scope.$index, selectShopingList)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom">
            <el-row :gutter="0">
              <el-col :span="12"
                ><div class="bottomLeft">
                  <el-button
                    type="warning"
                    @click="selectMember"
                    v-if="isMember"
                    >选择会员 A</el-button
                  >
                  <div v-else>
                    <span>卡号：{{ memberFrom.tel }}</span>
                    <span>姓名：{{ memberFrom.name }}</span>
                    <span>积分：{{ memberFrom.integral }}</span>
                    <span class="upMember">
                      <el-button
                        type="warning"
                        size="mini"
                        @click="selectMember"
                      >
                        重新选择 A
                      </el-button>
                    </span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12"
                ><div class="bottomRight">
                  <p>优惠：￥ {{ discount.toFixed(2) }}</p>
                  <p>
                    应收： <span style="color: #ff6014">￥</span>
                    <span style="color: #ff6014; font-size: 22px">{{
                      AddReceivablePic.toFixed(2)
                    }}</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="settlement">
          <el-button type="primary">收款 Space</el-button>
          <el-button type="success">现金 Z</el-button>
        </div>
      </el-col>
      <el-col :span="15">
        <div style="margin: 5px">
          <el-input
            placeholder="请输入条形码、商品名称进行查询！Tab"
            v-model="inquiryGoods"
            clearable
            class="input-with-select"
          >
            <div slot="prepend">组合查询</div>
            <el-button
              @click="addSearch"
              slot="append"
              type="primary"
              style="background: #1e77cb; color: #fff"
              >查询 Tab</el-button
            >
          </el-input>
        </div>
        <div
          class="goodsDetail"
          :style="{ height: this.bodyHeight + 40 + 'px' }"
        >
          <el-row :gutter="10">
            <el-col
              :span="4"
              v-for="(item, stockIndex) in stockData"
              :key="stockIndex"
            >
              <div @click="addShopingList(item)">
                <el-card :body-style="{ padding: '0px' }">
                  <div
                    class="image"
                    :style="{
                      backgroundImage: `url(http://127.0.0.1:7001/public/uploadFile/${item.imgUrl})`,
                    }"
                  >
                    {{ item.imgUrl ? "" : "暂无图片" }}
                  </div>
                  <div style="padding: 14px">
                    <span>{{ item.commodityTitle }}</span>
                    <div class="bottom clearfix">
                      <time class="time stockTxt"
                        >单价：{{ item.retailPrice }}￥</time
                      >
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--
        会员弹窗 star
    -->
      <div class="member" v-if="memberBox">
        <el-row class="memberTop">
          <el-col :span="8"
            ><div class="memberTopText" style="text-align: left">
              返回 Esc
            </div></el-col
          >
          <el-col :span="8"
            ><div class="memberTopText" style="text-align: center">
              选择会员
            </div></el-col
          >
          <el-col :span="8"
            ><div class="memberTopText" style="text-align: right">
              注册会员 Tab
            </div></el-col
          >
        </el-row>
        <div class="memberCon">
          <div style="margin-top: 15px" v-if="!isTabMember">
            <el-input
              placeholder="请输入手机号按 Enter 查询"
              v-model="memberInput"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                class="memberInputSearch"
                >查询 Enter</el-button
              >
            </el-input>
            <div>
              <calculation
                v-if="memberBox"
                @confirmEvent="_confirmEvent"
                :keyValue="onKeyCode"
                @Enter="_Enter"
              ></calculation>
            </div>
          </div>

          <!-- 注册会员表单 -->
          <div v-else>
            <el-form
              :model="addMemberForm"
              :rules="addMemberRules"
              ref="addMemberForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="会员姓名" prop="name">
                <el-input v-model="addMemberForm.name"></el-input>
              </el-form-item>
              <el-form-item label="会员手机号" prop="tel">
                <el-input v-model="addMemberForm.tel"></el-input>
              </el-form-item>
              <el-form-item label="会员生日">
                <el-date-picker
                  v-model="addMemberForm.birthday"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="会员地址">
                <el-input v-model="addMemberForm.address"></el-input>
              </el-form-item>
              <el-form-item label="会员性别">
                <el-radio-group v-model="addMemberForm.sex">
                  <el-radio label="男生"></el-radio>
                  <el-radio label="女生"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="addMemberSubmitForm('addMemberForm')"
                  >立即创建</el-button
                >
                <el-button @click="addMemberResetForm('addMemberForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!--
        会员弹窗 end
    -->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import calculation from "@/components/calculation";
import { getMember } from "@/api/member";
import {
  getType,
  searchStock,
  searchStockAdd,
  addMember,
} from "@/api/commodity";
export default {
  name: "Dashboard",
  components: {
    calculation,
  },
  computed: {
    ...mapGetters(["name"]),
    AddReceivablePic() {
      // 所有商品应收相加
      let pic = 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.discount = 0;
      this.selectShopingList.forEach((item) => {
        if (this.memberFrom.name) {
          // 如果是会员 则用会员价计算
          pic += item.number * item.memberPic;
          // 计算优惠金额
          this.discount += item.retailPrice - item.memberPic;
        } else {
          pic += item.number * item.retailPrice;
        }
      });
      return pic;
    },
  },
  created() {
    const documentHeight = document.body.clientHeight;
    this.bodyHeight = documentHeight - 160;
    const _this = this;
    document.onkeydown = function (e) {
      let key = window.event.key;
      console.log(key);
      // 给会员信息组件传值 加上时间和随机数来触发组件watch
      _this.onKeyCode =
        key + "&&&" + new Date() + Math.floor(Math.random() * 1000000);
      if (key == "a") {
        // 打开会员信息弹框
        _this.selectMember();
      }
      if (key == "Escape") {
        // 关闭会员信息弹框
        _this.memberBox = false;
        // 关闭会员注册弹框
        _this.isTabMember = false;
      }

      // 在没打开会员弹框的时候才能查询商品
      if (key == "Tab") {
        // 会员注册快捷键
        if (_this.memberBox) {
          _this.isTabMember = true;
        } else {
          // 查询商品
          _this.addSearch();
        }
      }

      if (key == " ") {
        // 结算
        _this.addSearch();
      }
      if (key == "F3") {
        // 跳转
        _this.$router.push({
          path: "/warehouse/index",
        });
        window.event.returnValue = false;
      }
    };
    getType().then((res) => {
      if (res.code == 0) {
        res.data.forEach((item) => {
          if (item.className == "商品类别") {
            this.commodityTypeList.push(item);
          }
        });
      }
    });
    this.getStockList();
  },
  data() {
    return {
      isTabMember: false, // 是否注册会员
      addMemberForm: {
        name: "", // 姓名
        tel: "", // 电话
        birthday: null, // 生日
        address: "", // 地址
        sex: "男生",
      },
      addMemberRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      tableLoading: true,
      stockData: [], // 商品列表
      inquiryGoods: "", // 查询商品
      onCommodityType: "1", // 商品分类选中值
      commodityTypeList: [], // 商品分类数组
      onKeyCode: "",
      isMember: true, // 是否选择了会员
      memberBox: false, // 会员查询输入框
      selectShopingList: [],
      bodyHeight: 300,
      oldFrom: {
        receivablePic: 10, // 应收
        netReceipts: 10, // 实收
        giveChange: 0, // 找零收
      },
      discount: 0, // 优惠金额
      isOld: false, // 是否有上一单交易
      seslected: 0, // 已选
      oldOddNumbers: "20210330-0001", // 上一单
      oddNumbers: "20210330-0001", // 单号
      memberInput: "", // 会员信息查询
      memberFrom: {},
    };
  },
  methods: {
    addMemberSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMember(this.addMemberForm).then((res) => {
            if (res.code == 0) {
              this.msgSuccess(res.message);
              this.addMemberResetForm();
              this.isTabMember = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addMemberResetForm(formName) {
      this.addMemberForm = {
        name: "", // 姓名
        tel: "", // 电话
        birthday: null, // 生日
        address: "", // 地址
        sex: "男生",
      };
    },
    addSearch() {
      searchStockAdd({
        code: this.inquiryGoods,
        commodityTitle: this.inquiryGoods,
      }).then((res) => {
        if (res.code == 0) {
          res.data.map((item) => {
            item.number = 1;
          });
          this.stockData = res.data;
          this.inquiryGoods = "";
        }
      });
    },
    async addShopingList(item) {
      let is = 0; // 判断是否已经添加 0没有 1已经有
      await this.selectShopingList.map((map) => {
        if (item.id == map.id) {
          is = 1;
          map.number++;
        }
      });
      if (is == 0) {
        this.selectShopingList.push(item);
      }
    },
    getStockList() {
      this.tableLoading = true;
      searchStock({
        pageNo: 1,
        pageSize: 1000000,
        commodityTitle: "",
        termOfValidityStart: 0,
        termOfValidityEnd: 500000,
        isDelete: "0",
      })
        .then((res) => {
          if (res.code == 0) {
            res.data.map((item) => {
              item.number = 1;
            });
            this.stockData = res.data;
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    handleCommodityType(tab, event) {
      // tab.name 对应商品分类码值
      console.log(tab.name, event);
    },
    selectMember() {
      this.memberBox = true;
    },
    deleteShoping(index, rows) {
      rows.splice(index, 1);
    },
    _confirmEvent(res) {
      this.memberInput = res;
    },
    _Enter(res) {
      if (res == "") {
        this.msgError("请输入手机号查询");
        return;
      }
      getMember({ val: res })
        .then((res) => {
          if (res.code === 0) {
            this.msgSuccess("会员查询成功");
            this.memberFrom = res.data;
            console.log(111111111111);
            this.memberBox = false;
            this.isMember = false;
            this.memberInput = "";
          }
        })
        .catch((err) => {
          this.memberFrom = {};
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.selectCommodity {
  position: relative;
  .top {
    height: 70px;
    background-color: #f7f7f7;
    text-align: center;
    line-height: 70px;
    padding: 0px 15px;
    span {
      display: inline-block;
      font-size: 18px;
    }
    span.topName {
      color: #1e77cb;
      width: 15%;
    }
    span.topOdd {
      width: 60%;
      color: #000;
    }
    span.topSelect {
      width: 25%;
      color: #1e77cb;
    }
  }
  .oldBox {
    padding: 3px 15px;
    .oldBoxConLeft {
      span {
        width: 80px;
        display: inline-block;
        text-align: right;
      }
    }
    .oldBoxConRight {
      p {
        display: inline-block;
        border-radius: 10px;
        border: 1px solid #1e77cb;
        color: #1e77cb;
        padding: 5px 15px;
        margin: 10px 0px;
      }
    }
  }
  .bottom {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    z-index: 9;
    left: 0;
    width: 100%;
    height: 110px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    .bottomLeft {
      margin: 16px 0 0;
      span {
        display: inline-block;
        margin: 5px;
        padding: 5px;
      }
      .upMember {
      }
    }
    .bottomRight {
      border-left: 1px solid #e6e6e6;
      color: #3e5267;
      margin: 16px 0 0;
    }
  }
  .selectShopingCon {
    overflow: auto;
    padding-bottom: 110px;
    .iconStyle {
      transition: all 0.2s;
    }
    .iconStyle:hover {
      color: red;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
.member {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #dddddd;
  z-index: 999;
  .memberTop {
    background-color: #1e77cb;
    line-height: 60px;
    .memberTopText {
      padding: 0px 15px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .memberCon {
    width: 40%;
    margin: 0px auto;
    background-color: #fff;
    height: 100%;
    padding: 15px 10px;
    position: relative;
    .memberInputSearch {
      background-color: #1e77cb;
      color: #fff;
      border: none;
    }
  }
}
.goodsDetail {
  overflow: scroll;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
  .el-col {
    margin-bottom: 20px;
  }
  time {
    font-size: 16px;
    color: #ff6014;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    background-size: cover;
    display: block;
    height: 100px;
    cursor: pointer;
    background-color: rgb(233, 233, 233);
    line-height: 100px;
    text-align: center;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
.settlement {
  margin: 10px;
}
</style>
