<template></template>

<script>
export default {
  props: ["live2dSetting"],
  data() {
    return {
      model: this.live2dSetting.model,
      width: this.live2dSetting.width,
      height: this.live2dSetting.height,
      direction: this.live2dSetting.direction,
      hOffset: this.live2dSetting.hOffset,
      vOffset: this.live2dSetting.vOffset
    };
  },
  mounted() {
    var pluginModelPath = "live2d-widget-model-" + this.model + "/assets/";
    var jsonPath =
      "/live2dw/live2d-widget-model-" +
      this.model +
      "/assets/" +
      this.model +
      ".model.json";
    window.L2Dwidget.init({
      pluginRootPath: "live2dw/",
      pluginJsPath: "lib/",
      pluginModelPath: pluginModelPath,
      tagMode: false,
      debug: true,
      model: { jsonPath: jsonPath },
      display: {
        position: this.direction,
        width: this.width,
        height: this.height,
        hOffset: this.hOffset,
        vOffset: this.vOffset
      },
      mobile: { show: true },
      log: false
    });
  },
  methods: {}
};
</script>


<style lang='less' scoped>
</style>