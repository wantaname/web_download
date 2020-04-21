<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card shadow="always">
      <el-alert title="只能下载vip免费文档、共享文档,专享文档和付费文档无法下载！" type="info" show-icon></el-alert>

      <el-input
        placeholder="例：https://wenku.baidu.com/view/afeb42f430126edb6f1aff00bed5b9f3f80f72f8.html"
        v-model="url"
        spellcheck='false'
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-download" @click="download"></el-button>
      </el-input>
      <el-divider>怎么看文档类型</el-divider>
      <img :src="img" alt="">
      
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      img:require('./wenku.png')
    };
  },

  methods: {
    download() {
      var download_url = this.url.trim();
      if (download_url.indexOf("http") !== 0) {
        return this.$message.error("链接错误！");
      }

      // loading
      const loading = this.$loading({
        lock: true,
        text: "正在下载...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      this.$http
        .post("/download/wenku", {
          url: download_url
        })
        .then(res => {
          loading.close();
          if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          }
          else if(res.data.status == 400)
          {
            return this.$message.error("下载失败，请稍后再试！");
          }
          else if(res.data.status == 300)
          {
         
            return this.$message.error(res.data.msg)
          }
          else if (res.data.status == 200) 
          {
            window.location.href=res.data.ddl_url
          }
        })
        .catch(error => {
          loading.close();
          console.log(error);
          return this.$message.error("系统错误！");
          
        });
    }
  }
};
</script>


<style lang='less' scoped>
img{
  width: 77%;
  display: block;
  margin: 0 auto;
}
.box-card {
  margin-top: 200px;
  width: 90%;
}
.container {
  height: 100%;

  .el-card {
    height: 100%;
  }
}

.el-input {
  margin: 20px;
  width: 90%;
}
</style>