<template>
  <div class="key-container">
    <div class="keyboard">
      <div class="key-row">
        <div class="key-cell" data-num="7" :class="onKey == 7 ? 'onKey' : ''">
          7
        </div>
        <div class="key-cell" data-num="8" :class="onKey == 8 ? 'onKey' : ''">
          8
        </div>
        <div class="key-cell" data-num="9" :class="onKey == 9 ? 'onKey' : ''">
          9
        </div>
        <div
          class="key-cell"
          data-num="D"
          :class="onKey == 'Backspace' ? 'onKey' : ''"
          style="background-color: #ffc168; color: #fff"
        >
          <span class="radiusKey">X</span>
        </div>
      </div>
      <div class="key-row">
        <div class="key-cell" data-num="4" :class="onKey == 4 ? 'onKey' : ''">
          4
        </div>
        <div class="key-cell" data-num="5" :class="onKey == 5 ? 'onKey' : ''">
          5
        </div>
        <div class="key-cell" data-num="6" :class="onKey == 6 ? 'onKey' : ''">
          6
        </div>
        <div
          class="key-cell"
          data-num="C"
          :class="onKey == 'Delete' ? 'onKey' : ''"
        >
          清空 Delete
        </div>
      </div>
      <div class="key-row">
        <div class="key-cell" data-num="1" :class="onKey == 1 ? 'onKey' : ''">
          1
        </div>
        <div class="key-cell" data-num="2" :class="onKey == 2 ? 'onKey' : ''">
          2
        </div>
        <div class="key-cell" data-num="3" :class="onKey == 3 ? 'onKey' : ''">
          3
        </div>
        <div class="key-cell" data-num="-1"></div>
      </div>
      <div class="key-row">
        <div class="key-cell disabled" data-num="-1"></div>
        <div class="key-cell" data-num=".">.</div>
        <div class="key-cell" data-num="0" :class="onKey == 10 ? 'onKey' : ''">
          0
        </div>
        <div class="key-cell" data-num="-1"></div>
      </div>
      <div
        class="key-confirm"
        data-num="S"
        :class="onKey == 'Enter' ? 'onKey' : ''"
      >
        确认 Enter
      </div>
    </div>
  </div>
</template>

<script>
let keyNumber = "";
export default {
  data() {
    return {
      money: "",
      onKey: "",
      keyCode: "",
    };
  },
  props: {
    keyValue: {
      type: [String, Number],
      default: "",
    },
  },
  watch: {
    keyValue: {
      handler: function (val) {
        console.log(val);
        val = val.split("&&&")[0];
        console.log(val);
        const keyCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.onKey = val;
        if (val == 0) {
          this.onKey = 10;
        }

        // 删除
        if (val === "Backspace") {
          keyNumber = keyNumber.substring(0, keyNumber.length - 1);
          this.$emit("confirmEvent", keyNumber);
        }
        // 清空输入框
        if (val === "Delete") {
          keyNumber = "";
          this.$emit("confirmEvent", keyNumber);
        }
        // 匹配数字
        if (keyCode.includes(Number(val))) {
          keyNumber += val;
          this.$emit("confirmEvent", keyNumber);
        }
        // 确认按钮
        if (val === "Enter") {
          this.$emit("Enter", keyNumber);
          keyNumber = "";
        }
        setTimeout(() => {
          this.onKey = "";
        }, 100);
      },
      // _this.keyFun(key);
    },
  },
  mounted() {
    const _this = this;

    let keyNumber = "";
    // eslint-disable-next-line space-before-function-paren
    // document.onkeydown = function (e) {
    //
    // };
    console.log(this.key);
  },
  methods: {},
};
</script>

<style scoped>
.key-container {
  margin-top: 50px;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.input-box {
  font-size: 35px;
  font-weight: bold;
  height: 40px;
  padding: 10px 15px;
  text-align: right;
  width: 90%;
}

.keyboard {
  position: fixed;
  bottom: 0;
  left: 32%;
  height: 240px;
  width: 36%;
}

.keyboard .key-row {
  display: flex;
  display: -webkit-flex;
  position: relative;
  height: 60px;
  line-height: 60px;
}

.keyboard .key-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.keyboard .key-cell {
  flex: 1;
  -webkit-box-flex: 1;
  text-align: center;
  position: relative;
  background-color: #e9e9e9;
  margin: 5px;
}

.keyboard .key-cell::after {
  content: "";
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  height: 200%;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.keyboard .key-cell:nth-last-child(1)::after {
  border-right: 0;
}

.keyboard .key-confirm {
  position: absolute;
  text-align: center;
  height: 118px;
  width: 25%;
  line-height: 118px;
  background: #1890ff;
  color: #fff;
  z-index: 5;
  right: 0;
  bottom: 1px;
}
.onKey {
  animation-name: example;
  animation-duration: 0.1s;
}
@keyframes example {
  from {
    background-color: #1890ff;
    color: #fff;
  }
  to {
    background-color: #e9e9e9;
    color: #000;
  }
}
.radiusKey {
  border: 1px solid #fffefe;
  display: inline-block;
  width: 35px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
