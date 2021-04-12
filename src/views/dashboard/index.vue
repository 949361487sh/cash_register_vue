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
                prop="name"
                align="center"
                label="商品名"
                min-width="150"
              >
              </el-table-column>
              <el-table-column label="数量" align="center" width="160">
                <template slot-scope="scope">
                  <el-input-number
                    size="small"
                    :precision="2"
                    :min="1"
                    :max="100"
                    v-model="scope.row.number"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="pic" label="价格">
                <template slot-scope="scope">
                  {{ (scope.row.pic * scope.row.number).toFixed(2) }}
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
                    <span>卡号：{{ memberFrom.card }}</span>
                    <span>姓名：{{ memberFrom.name }}</span>
                    <span>积分：{{ memberFrom.integral }}</span>
                    <span class="upMember">
                      <el-button
                        type="warning"
                        size="mini"
                        @click="selectMember"
                        >重新选择 A</el-button
                      >
                    </span>
                  </div>
                </div></el-col
              >
              <el-col :span="12"
                ><div class="bottomRight">
                  <p>优惠：￥ {{ discount.toFixed(2) }}</p>
                  <p>
                    应收： <span style="color: #ff6014">￥</span>
                    <span style="color: #ff6014; font-size: 22px">{{
                      AddReceivablePic.toFixed(2)
                    }}</span>
                  </p>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="lookupCommodity">
          <el-tabs
            v-model="onCommodityType"
            type="border-card"
            @tab-click="handleCommodityType"
          >
            <el-tab-pane
              :label="item.type"
              :name="item.value"
              v-for="item in commodityTypeList"
              :key="item.id"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="margin: 5px">
          <el-input
            placeholder="请输入条形码、商品名称进行查询！Tab"
            v-model="inquiryGoods"
            clearable
            class="input-with-select"
          >
            <div slot="prepend">组合查询</div>
            <el-button
              slot="append"
              type="primary"
              style="background: #1e77cb; color: #fff"
              >查询 Enter</el-button
            >
          </el-input>
        </div>
        <div class="goodsDetail">
          <el-row :gutter="10">
            <el-col :span="4" v-for="(o, index) in 10" :key="o">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
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
          <div style="margin-top: 15px">
            <el-input placeholder="请输入内容" v-model="memberInput">
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
import { getType, searchStock } from "@/api/commodity";
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
          this.discount += item.pic - item.memberPic;
        } else {
          pic += item.number * item.pic;
        }
      });
      return pic;
    },
  },
  created() {
    this.bodyHeight = document.body.clientHeight;
    this.bodyHeight = this.bodyHeight - 160;
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
      getMember({ val: res })
        .then((res) => {
          if (res.code === 0) {
            this.memberFrom = res.data;
            console.log(res.data);
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
  time {
    font-size: 13px;
    color: #999;
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
    display: block;
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
</style>
