export default {
  created() {
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

  }
}
