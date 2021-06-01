export default {
  created() {
    const _this = this;
    const toPath = this.$route.path;
    document.onkeydown = function(e) {
      let key = window.event.key;
      console.log(key);
      // 给会员信息组件传值 加上时间和随机数来触发组件watch
      _this.onKeyCode =
        key + "&&&" + new Date() + Math.floor(Math.random() * 1000000);
      _this.onKeyCode_settlement =
        key + "&&&" + new Date() + Math.floor(Math.random() * 1000000);

      // 仓库管理页面
      if (toPath == "/warehouse/index") {
        // 新增商品
        if (key == "a") {
          _this.dialogWarehouseFormVisible = true;
        }
      }

      if (
        key == "a" &&
        (toPath == "/dashboard" || toPath == "/" || toPath == "/member/index")
      ) {
        // 打开会员信息弹框
        _this.memberTitle = "会员注册";
        _this.selectMember();
      }
      if (
        key == "Escape" &&
        (toPath == "/dashboard" || toPath == "/" || toPath == "/member/index")
      ) {
        // 关闭会员信息弹框
        _this.memberBox = false;
        // 关闭会员注册弹框
        _this.isTabMember = 0;
      }
      // 收银首页 start
      if (toPath == "/dashboard" || toPath == "/") {
        // 在没打开会员弹框的时候才能查询商品
        if (key == "Tab") {
          // 会员注册快捷键
          if (_this.memberBox) {
            if (_this.isTabMember == 0) {
              _this.isTabMember = 1;
            }
          } else {
            // 查询商品
            _this.addSearch();
          }
        }
        // 打开收银结算弹框
        if (key == " " || key == "z") {
          _this.shoukuan(key);
        }
      }
      // 收银首页 end
      if (key == "F3") {
        // 跳转
        _this.$router.push({
          path: "/warehouse/index"
        });
        window.event.returnValue = false;
      }
      if (key == "F1") {
        // 跳转
        _this.$router.push({
          path: "/dashboard"
        });
        window.event.returnValue = false;
      }
      if (key == "F2") {
        // 跳转
        _this.$router.push({
          path: "/orderQuery/index"
        });
        window.event.returnValue = false;
      }
      if (key == "F4") {
        // 跳转
        _this.$router.push({
          path: "/member/index"
        });
        window.event.returnValue = false;
      }
    };
  }
};
