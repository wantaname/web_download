<template>
  <el-container>
    <div id="particles">
      <vue-particles></vue-particles>
    </div>

    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="wenku">百度文库</el-menu-item>

        <el-menu-item index="csdn">CSDN</el-menu-item>

        <el-menu-item index="account">个人中心</el-menu-item>
      </el-menu>
    </el-header>
    <!-- 内容区域 -->
    <el-main>
      <div id="main">
        <router-view></router-view>
      </div>
    </el-main>

    <live2d :live2dSetting="live2dSetting"></live2d>
  </el-container>
</template>

<script>
import live2d from "./live2d";
export default {
  data() {
    return {
      live2dSetting: {
        model: "shizuku",
        width: 200,
        height: 400,
        direction: "right",
        hOffset: 0,
        vOffset: 0
      },
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, path) {
      console.log(key, path);
    }
  },
  components: {
    live2d
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-row {
  height: 100%;
}
.el-card {
  height: 100%;
}
.el-main {
  height: 100%;
  padding: 0;
}
.el-header {
  padding: 0;
  height: 10%;
}
.el-menu {
  display: flex;
  justify-content: center;
}
#particles {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  #particles-js {
    width: 100%;
    height: 100%;
  }
}
</style>