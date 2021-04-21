<template>
  <div class="navbar">
    <el-row :gutter="10">
      <el-col :span="4"
        ><div
          class="topNav"
          @click="toPage('/')"
          :class="navUrl == '/' || navUrl == '/dashboard' ? 'onTopNav' : ''"
        >
          收银台 F1
        </div></el-col
      >
      <el-col :span="4"
        ><div
          class="topNav"
          @click="toPage('/orderQuery/index')"
          :class="navUrl == '/orderQuery/index' ? 'onTopNav' : ''"
        >
          交易查询 F2
        </div></el-col
      >
      <el-col :span="4"
        ><div
          class="topNav"
          @click="toPage('/warehouse/index')"
          :class="navUrl == '/warehouse/index' ? 'onTopNav' : ''"
        >
          仓库管理 F3
        </div></el-col
      >
      <el-col :span="4"
        ><div
          class="topNav"
          @click="toPage('/member/index')"
          :class="navUrl == '/member/index' ? 'onTopNav' : ''"
        >
          会员管理 F4
        </div></el-col
      >
      <el-col :span="4"
        ><div
          class="topNav"
          @click="toPage('/onlineOrder/index')"
          :class="navUrl == '/onlineOrder/index' ? 'onTopNav' : ''"
        >
          线上订单 F5
        </div></el-col
      >
      <el-col :span="4"><div class="topNav">其他 F6</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  data() {
    return {
      navUrl: "/",
    };
  },
  created() {
    this.navUrl = this.$route.path;
    console.log(this.$route.path);
  },
  watch: {
    $route(to, from) {
      console.log(to.path, "地址栏变化");
      this.navUrl = to.path;
    },
  },
  methods: {
    toPage(url) {
      this.navUrl = url;
      this.$router.push({
        path: url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #1e77cb;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0px 15px;
}
.topNav {
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
}
.onTopNav {
  background: rgba(255, 255, 255, 0.6);
}
</style>
