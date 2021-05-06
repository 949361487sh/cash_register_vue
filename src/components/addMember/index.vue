<template>
  <div>
    <el-form
      :model="addMemberForm"
      :rules="addMemberRules"
      ref="addMemberForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="会员姓名" prop="memberName">
        <el-input v-model="addMemberForm.memberName"></el-input>
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
          <el-radio label="1">男生</el-radio>
          <el-radio label="0">女生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="积分" v-if="list">
        <el-input v-model="addMemberForm.integral"></el-input>
      </el-form-item>
      <el-form-item label="会员余额" v-if="list">
        <el-input v-model="addMemberForm.balance"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMemberSubmitForm('addMemberForm')"
          >立即创建</el-button
        >
        <el-button @click="addMemberResetForm('addMemberForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addMember } from "@/api/commodity";
import { upMember } from "@/api/member";
export default {
  name: "Member",
  props: {
    list: {
      type: String,
    },
  },
  mounted() {
    if (this.list) {
      this.addMemberForm = JSON.parse(this.list);
    }
  },
  data() {
    return {
      id: null,
      addMemberForm: {
        memberName: "", // 姓名
        tel: "", // 电话
        birthday: null, // 生日
        address: "", // 地址
        sex: "1",
        balance: "",
        integral: "",
      },
      addMemberRules: {
        memberName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  methods: {
    addMemberResetForm(formName) {
      this.addMemberForm = {
        memberName: "", // 姓名
        tel: "", // 电话
        birthday: null, // 生日
        address: "", // 地址
        sex: "男生",
      };
    },
    addMemberSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addMemberForm.id) {
            upMember(this.addMemberForm).then((res) => {
              if (res.code == 0) {
                this.msgSuccess(res.message);
                this.addMemberResetForm();
                this.$emit("addMember");
              }
            });
            return;
          }
          addMember(this.addMemberForm).then((res) => {
            if (res.code == 0) {
              this.msgSuccess(res.message);
              this.addMemberResetForm();
              this.$emit("addMember");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
