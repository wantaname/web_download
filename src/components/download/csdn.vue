<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card>
      <el-card shadow="nerver" class="tip">
        <div>
          由于CSDN网站的诸多限制，暂不支持网页下载，如需下载CSDN，请添加QQ机器人账号：
          <span>922694186</span>或者QQ群
          <span>894761502</span>。
          可以在此页面看到你最近的下载(需要绑定账号)
        </div>
      </el-card>
      <!-- 下载列表 -->
      <el-card class="downloadlist" shadow="hover">
        <div slot="header" class="clearfix">
          <span>我的下载</span>
        </div>
        <el-table :data="downloadList" height="400px" style="width: 100%">
          <el-table-column label="日期" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="链接" min-width="300">
            <template slot-scope="scope">
              <i class="el-icon-link"></i>
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="success"
                round
                class="el-icon-download"
                @click="download(scope.row.ddl_url)"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloadList: []
    };
  },
  created() {
    this.getDownloadList();
  },
  methods: {
    download(ddl_url) {
      window.location.href = ddl_url;
    },
    getDownloadList() {
      this.$http
        .get("/download/getCsdn")
        .then(res => {
          if (res.data.status == 200) {
            this.downloadList = res.data.downloadList;
          } else if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style lang='less' scoped>
.downloadlist {
  margin-top: 30px;
  background-color: #fafafa;
}
.el-card {
  height: 100%;
}
.tip {
  background-color: #d0d0d0;
  span {
    color: red;
    font-size: 17px;
  }
}
.container {
  height: 100%;
}
</style>