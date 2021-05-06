<template>
  <div class="orderBox">
    <el-form :inline="true" :model="memberQueryForm" class="demo-form-inline">
      <el-form-item label="会员状态">
        <el-select v-model="memberQueryForm.state" placeholder="请选择会员状态">
          <el-option label="全部" value="2"></el-option>
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员性别">
        <el-select v-model="memberQueryForm.sex" placeholder="请选择会员性别">
          <el-option label="全部" value="2"></el-option>
          <el-option label="男士" value="1"></el-option>
          <el-option label="女生" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员姓名">
        <el-input
          v-model="memberQueryForm.name"
          placeholder="请输入会员姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="会员电话">
        <el-input
          v-model="memberQueryForm.tel"
          placeholder="请输入会员电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="会员加入日期">
        <el-date-picker
          v-model="memberQueryForm.time"
          type="daterange"
          align="right"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sreachOrderQuery">查询</el-button>
        <el-button type="warning" icon="el-icon-plus" @click="selectMember"
          >新增会员</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :data="orderTable"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        fixed="left"
        type="index"
        :index="indexMethod"
        width="50"
        label="序列"
      >
      </el-table-column>
      <el-table-column prop="memberName" label="会员姓名" min-width="100">
      </el-table-column>
      <el-table-column prop="tel" label="会员电话" min-width="100">
      </el-table-column>
      <el-table-column prop="sex" label="会员性别" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == '0'" style="color: red"
            ><i class="el-icon-female"></i> 女生</span
          >
          <span v-if="scope.row.sex == '1'" style="color: blue"
            ><i class="el-icon-male"></i> 男生</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="integral" label="积分" min-width="100">
      </el-table-column>
      <el-table-column prop="balance" label="余额" min-width="100">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日" min-width="150">
        <template slot-scope="scope">{{
          scope.row.birthday | datefmt
        }}</template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" min-width="100">
      </el-table-column>
      <el-table-column label="创建时间" min-width="150">
        <template slot-scope="scope">{{
          scope.row.createTime | datefmt
        }}</template>
      </el-table-column>
      <el-table-column label="更新日期" min-width="150">
        <template slot-scope="scope">{{
          scope.row.updateTime | datefmt
        }}</template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" @click="updateMember(scope.row)"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="delMemberFun(scope.row)"
            v-if="scope.row.state == '1'"
          >
            启用
          </el-button>
          <el-button
            type="danger"
            @click="delMemberFun(scope.row)"
            v-if="scope.row.state == '0'"
          >
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 30px auto 100px; text-align: center">
      <el-pagination
        background
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :current-page="pageNo"
        @size-change="sizeChange_order"
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="currentChange_order"
      >
      </el-pagination>
    </div>
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
            <span>{{ memberTitle }}</span>
          </div></el-col
        >
      </el-row>
      <div class="memberCon">
        <!-- 注册会员表单 -->
        <div>
          <member @addMember="addMemberSuccse" :list="updateMemberForm" />
        </div>
      </div>
    </div>
    <!--
        会员弹窗 end
    -->
  </div>
</template>
<script>
import { getMemberList, upMember, delMember } from "@/api/member";
import member from "@/components/addMember/index.vue";
import onKey from "@/components/onKey/index.js";
export default {
  name: "MemberIndex",
  components: {
    member,
  },
  mixins: [onKey],
  data() {
    return {
      memberTitle: "注册会员",
      updateMemberForm: "",
      memberBox: false,
      orderTable: [],
      total: 1000,
      pageNo: 1, // 当前页数
      pageSize: 10,
      tableLoading: false,
      memberQueryForm: {
        sex: "2",
        time: "",
        name: "",
        tel: "",
        state: "0",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    // this.getStockList();
    this.getMember(["2021-01-01", "2100-12-12"]);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state === "1") {
        return "warning-row";
      }
      return "";
    },
    delMemberFun(row) {
      row.state = row.state == "0" ? "1" : "0";
      delMember({ id: row.id, state: row.state }).then((res) => {
        if (res.code == 0) {
          if (row.state == "0") {
            this.msgSuccess("禁用成功");
          }
          if (row.state == "1") {
            this.msgSuccess("启用成功");
          }
          this.getMember();
        }
      });
    },
    selectMember(row) {
      this.memberBox = true;
      if (row) {
        this.memberTitle = "修改会员信息";
        this.updateMemberForm = JSON.stringify(row);
      }
    },
    addMemberSuccse() {
      this.memberBox = false;
      this.getMember();
    },
    getMember(time) {
      if (!time) {
        time = ["2021-01-01", "2100-12-12"];
      }
      const data = {
        name: this.memberQueryForm.name,
        tel: this.memberQueryForm.tel,
        startTime: this.$moment(time[0]).format("YYYY-MM-DD"),
        endTime: this.$moment(time[1]).format("YYYY-MM-DD"),
        state: this.memberQueryForm.state,
        sex: this.memberQueryForm.sex,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      };
      getMemberList(data).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.orderTable = res.data;
          this.total = res.total;
        }
      });
    },
    updateMember(row) {
      console.log(row, "点击修改");

      this.selectMember(row);
    },
    indexMethod(indedx) {
      return indedx + 1 + (this.pageNo - 1) * this.pageSize;
    },
    sreachOrderQuery() {
      this.getMember(this.memberQueryForm.time);
    },
    sizeChange_order(size) {
      console.log(size, "改变查询总条数");
      this.pageSize = size;
      this.getMember();
    },
    currentChange_order(size) {
      console.log(size, "改变页数");
      this.pageNo = size;
      this.getMember();
    },
  },
};
</script>
<style lang="scss">
.orderBox {
  padding: 20px;
  .el-table .warning-row {
    background-color: #f56c6c;
    color: rgb(105, 105, 105);
    color: #fff;
  }
  .el-table .warning-row:hover {
    color: rgb(46, 46, 46);
  }
}
</style>
