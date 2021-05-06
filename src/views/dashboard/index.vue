<template>
  <div>
    <el-row>
      <el-col :span="9">
        <div class="selectCommodity" :style="{ height: bodyHeight + 'px' }">
          <div class="top">
            <span class="topName blod"> 客单 </span>
            <span class="topOdd blod">{{ nowOderNumber }}</span>
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
                      <p>
                        <span>商品金额：</span><b>{{ oldFrom.allPic }}</b> 元
                      </p>
                      <p>
                        <span>优惠金额：</span><b>{{ oldFrom.discount }}</b> 元
                      </p>
                      <p>
                        <span>应收金额：</span
                        ><b>{{ oldFrom.addReceivablePic }}</b> 元
                      </p>
                      <p>
                        <span>实收金额：</span
                        ><b>{{ oldFrom.receiptsPic }}</b> 元
                      </p>
                      <p>
                        <span>找零：</span><b>{{ oldFrom.giveChange }}</b> 元
                      </p>
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
            v-else
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
                    <span>姓名：{{ memberFrom.memberName }}</span>
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
                      addReceivablePic.toFixed(2)
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
              <span v-if="isTabMember == 0">选择会员</span>
              <span v-if="isTabMember == 1">注册会员</span>
              <span v-if="isTabMember == 2">收款</span>
              <span v-if="isTabMember == 4">新增商品</span>
            </div></el-col
          >
          <el-col :span="8" v-if="isTabMember == 0"
            ><div class="memberTopText" style="text-align: right">
              注册会员 Tab
            </div></el-col
          >
        </el-row>
        <div
          class="memberCon"
          :style="{ width: isTabMember == 4 ? '100%' : '40%' }"
        >
          <div style="margin-top: 15px" v-if="isTabMember == 0">
            <el-input
              placeholder="请输入手机号按 Enter 查询"
              v-model="memberInput"
              disabled
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
          <div v-if="isTabMember == 1">
            <member @addMember="addMemberSuccse" />
          </div>
          <div v-if="isTabMember == 2">
            <el-divider content-position="left">
              <span class="titleStyle">订单明细</span>
            </el-divider>
            <div class="collection">
              <div class="collectionOrder borderDashed">
                <el-row>
                  <el-col :span="6"> <div>订单金额</div> </el-col>
                  <el-col :span="10">
                    <div style="color: #909090">
                      ￥{{ addReceivablePic.toFixed(2) }}
                    </div>
                  </el-col>
                  <el-col :span="4"> <div>商品数</div> </el-col>
                  <el-col :span="1">
                    <div style="color: #909090">
                      {{ selectShopingList.length }}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="collectionOrder">
                <el-row>
                  <el-col :span="6"> <div>优惠小计</div> </el-col>
                  <el-col :span="10">
                    <div style="color: #909090">
                      ￥{{ discount.toFixed(2) }}
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-top: 20px">
                  <el-col :span="6"> <div>应收金额</div> </el-col>
                  <el-col :span="10">
                    <div
                      style="color: #000; font-size: 24px; font-weight: bold"
                    >
                      ￥{{ addReceivablePic.toFixed(2) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="collection">
              <div class="collectionOrder">
                <el-row style="padding-top: 20px">
                  <el-col :span="6"> <div>未收金额</div> </el-col>
                  <el-col :span="10">
                    <div
                      style="color: #ff6014; font-size: 28px; font-weight: bold"
                    >
                      ￥{{ addReceivablePic.toFixed(2) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-divider content-position="left">
              <span class="titleStyle">选择付款方式</span>
            </el-divider>
            <div class="paymentStyle">
              <span>现金 Z</span>
              <span>微信 X</span>
              <span>支付宝 C</span>
            </div>
          </div>
          <!-- 现金支付 -->
          <div style="margin-top: 15px" v-if="isTabMember == 3">
            <div class="settlementInput">
              <el-row>
                <el-col :span="19"> <span>实收金额</span> </el-col>
                <el-col :span="5">
                  <b>{{ receiptsPic }}</b>
                </el-col>
              </el-row>
            </div>
            <el-row class="settlementCon">
              <el-col :span="19"> 本次收款 </el-col>
              <el-col :span="5"> ￥{{ addReceivablePic.toFixed(2) }} </el-col>
            </el-row>
            <el-row class="settlementCon">
              <el-col :span="19"> 找零 </el-col>
              <el-col :span="5"> ￥{{ giveChange.toFixed(2) }} </el-col>
            </el-row>
            <div>
              <calculation
                v-if="memberBox"
                @confirmEvent="_confirmEvent_settlement"
                :keyValue="onKeyCode_settlement"
                @Enter="_Enter_settlement"
              ></calculation>
            </div>
          </div>
          <!--

              添加商品

          -->
          <div v-if="isTabMember == 4">
            <warehouse @upList="upList" />
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
import member from "@/components/addMember/index.vue";
import warehouse from "@/components/warehouse/index";
import { getMember } from "@/api/member";
import {
  getType,
  searchStock,
  searchStockAdd,
  addMember,
  newOrders,
  searchOderNumber,
} from "@/api/commodity";
import onKey from "@/components/onKey/index.js";
export default {
  name: "Dashboard",
  components: {
    member,
    calculation,
    warehouse,
  },
  mixins: [onKey],
  computed: {
    ...mapGetters(["name"]),
    giveChange() {
      return this.receiptsPic - this.addReceivablePic >= 0
        ? this.receiptsPic - this.addReceivablePic
        : 0;
    },
    addReceivablePic() {
      // 所有商品应收相加
      let pic = 0;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.discount = 0;
      this.selectShopingList.forEach((item) => {
        if (this.memberFrom.memberName) {
          // 如果是会员 则用会员价计算
          pic += item.number * item.memberPic;
          // 计算优惠金额
          this.discount += item.retailPrice - item.memberPic;
        } else {
          pic += item.number * item.retailPrice;
        }
      });
      this.receiptsPic = pic;
      return pic;
    },
  },
  created() {
    searchOderNumber({ orderNumber: "20210416111146" }).then((res) => {
      console.log(res);
    });
    const documentHeight = document.body.clientHeight;
    this.bodyHeight = documentHeight - 160;

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
    this.scanCode();
    this.nowOderNumber = this.getNowOderNumber();
  },
  data() {
    return {
      nowOderNumber: 0,
      receiptsPic: 0, // 实收金额
      isTabMember: 0, // 0=查询会员 1=新增会员 2=结算 3=现金结算
      tableLoading: true,
      stockData: [], // 商品列表
      inquiryGoods: "", // 查询商品
      onCommodityType: "1", // 商品分类选中值
      commodityTypeList: [], // 商品分类数组
      onKeyCode: "",
      onKeyCode_settlement: "",
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
    upList() {
      this.getStockList();
      this.memberBox = false;
      this.isTabMember = 0;
    },
    getNowOderNumber() {
      return this.$moment(this.createTime).format("YYYYMMDDHHmmss");
    },
    voiceAnnouncements(str) {
      console.log(str, "执行播放");
      const msg = new SpeechSynthesisUtterance(str);
      // msg.text = str;
      // msg.rate = 1;
      // msg.pitch = 2;
      window.speechSynthesis.speak(msg);
    },
    scanCode() {
      let code = "";
      let lastTime, nextTime;
      let lastCode, nextCode;
      let that = this;
      window.document.onkeypress = function (e) {
        if (that.isMember) return;
        console.log("111111");
        if (window.event) {
          // IE
          nextCode = e.keyCode;
        } else if (e.which) {
          // Netscape/Firefox/Opera
          nextCode = e.which;
        }
        if (e.which === 13) {
          if (code.length < 3) return; // 手动输入的时间不会让code的长度大于2，所以这里只会对扫码枪有
          console.log(code);
          console.log("扫码结束");
          that.inquiryGoods = code;
          that.addSearch("扫码");
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
    addMemberSuccse() {
      this.isTabMember = 0;
    },
    addSearch(type) {
      searchStockAdd({
        code: this.inquiryGoods,
        commodityTitle: this.inquiryGoods,
        isDelete: "0",
      }).then((res) => {
        if (res.code == 0) {
          if (res.data.length == 0) {
            this.msgInfo("没有该商品信息，请新增商品后在查询!");
            // 如果没有查询出来商品，则说明可能没有该商品，则要新增商品
            this.isTabMember = 4;
            this.memberBox = true;
            return;
          }
          res.data.map((item) => {
            item.number = 1;
          });
          this.stockData = res.data;

          if (type === "扫码") {
            this.addShopingList(res.data[0]);
          } else {
            this.inquiryGoods = "";
          }
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
      this.isOld = false;
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
    _confirmEvent_settlement(res) {
      console.log(res, "_confirmEvent_settlement");
      console.log(this.inquiryGoods, "搜索值_confirmEvent_settlement");
      this.receiptsPic = res;
    },
    _Enter(res) {
      if (res == "") {
        this.msgError("请输入手机号查询");
        return;
      }
      getMember({ val: res, state: "0" })
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
    _Enter_settlement(res) {
      console.log(res);
      console.log(this.inquiryGoods, "搜索值_Enter_settlement");
      this.voiceAnnouncements(
        `现金收款 ${this.receiptsPic} 元 ,找零${this.giveChange} 元。`
      );
      this.oldOddNumbers = this.nowOderNumber;
      let commodityIds = [];
      this.selectShopingList.forEach((res) => {
        commodityIds.push(res.id);
      });
      newOrders({
        addReceivablePic: this.addReceivablePic,
        receiptsPic: this.receiptsPic,
        giveChange: this.giveChange,
        orderNumber: this.nowOderNumber,
        discount: this.discount,
        allPic: parseFloat(this.addReceivablePic + this.discount),
        commodityIds: commodityIds.join(","),
        memberName: this.memberFrom.memberName,
      }).then((res) => {
        if (res.code == 0) {
          this.inquiryGoods = "";
          this.addSearch();
          this.oldFrom = res.data[0];
          this.nowOderNumber = this.getNowOderNumber();
          this.memberBox = false;
          this.selectShopingList = [];
          this.isOld = true;
          this.msgSuccess("支付成功");
        }
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
      b {
        color: #ff6014;
        font-size: 18px;
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
.settlementCon {
  padding: 20px 25px;
}
.settlementInput {
  border: 1px solid rgb(204, 203, 203);
  padding: 15px;
  span {
    color: #4e99df;
  }
  b {
    font-size: 24px;
  }
}
</style>
