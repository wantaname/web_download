<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <!-- 我的积分 -->
      <el-tab-pane label="我的积分" name="myScore">
        <div class="myjifen">
          <div>
            <span>我的积分 </span>
            <el-tag effect="plain" type="success">{{score}}</el-tag>
          </div>

        </div>

        <el-divider>使用规则</el-divider>
        <el-alert title="文库下载消耗1积分，csdn下载消耗10积分" type="warning" close-text="知道啦"></el-alert>
      </el-tab-pane>

      <!-- 积分充值 -->
      <el-tab-pane label="积分充值" name="chongzhiScore">
        <div class="chongzhijifen">
          <div class="chongzhi">
            <el-radio v-model="radio" label="1" size="medium" border>微信</el-radio>
          </div>

          <div class="select_chongzhi">
            <el-select v-model="select" placeholder="请选择" size="medium">
              <el-option label="1元/10积分" value="1"></el-option>
              <el-option label="5元/60积分" value="5"></el-option>
              <el-option label="10元/130积分" value="10"></el-option>
            </el-select>
            <el-button type="primary" @click="click_chongzhi">点击充值</el-button>
          </div>

          <div>
            <el-alert title="因为没有第三方支付接口，所以并非实时到账。请务必填写订单号！" type="warning" close-text></el-alert>
            <el-input v-model="order" placeholder="请输入订单号"></el-input>
            <el-button type="primary" @click="chongzhiCommit" class="commitBtn">提交</el-button>
          </div>
        </div>

          <!-- 收款码 -->
        <el-dialog title="充值" :visible.sync="dialogVisible" class="pay" >
          <div class="wechat">
            <img :src="src" alt />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>

      
      <!-- 充值记录 -->

      <el-tab-pane label="我的订单" name="myOrder">
        <el-table :data="orderTable" style="width: 100%" height="400px">
          <el-table-column label="日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.money}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单号">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.order}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="info" effect="dark" v-if="scope.row.state=='待处理'">{{ scope.row.state }}</el-tag>
              <el-tag type="success" effect="dark" v-else>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 积分
      score: 0,

      order: "",
      url: "",
      select: "",
      dialogVisible: false,
      avatar: require("./logo.png"),
      activeName: "myScore",
      radio: "1",
      src: require("./wechat.jpg"),

      direction: "ttb",
      drawer: true,

      orderTable: []
    };
  },
  created() {
    this.getUserInfo();
  },

  methods: {
    refreshOrder() {
      this.$http
        .get("/account/refreshOrder")
        .then(res => {
          if (res.data.status == 200) {
            this.orderTable = res.data.order;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    chongzhiCommit() {
      if(this.select ==''){
        return this.$message.warning('请选择充值积分')

      }
      if(this.order==''){
        return this.$message.warning('请输入订单号')
        
      }
      this.$http
        .post("/account/chongzhi", {
          money: this.select,
          order: this.order
        })
        .then(res => {
          if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          } else if (res.data.status == 300) {
            console.log(res.data.msg);
            return this.$message.error(res.data.msg);
          } else if (res.data.status == 200) {
            this.refreshOrder();
            this.order=''
            return this.$message.success(
              "提交成功，可以前往--我的订单--查看进度"
            );
          }
        })
        .catch(error => {
          console.log(error);
          return this.$message.error("系统错误！");
        });
    },
    click_chongzhi() {
      this.dialogVisible = true;
    },
    // 获取用户信息
    getUserInfo() {
      this.$http
        .get("/account/getUserInfo")
        .then(res => {
          if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          } else if (res.data.status == 400) {
            return this.$message.error("加载失败，请稍后再试！");
          } else if (res.data.status == 300) {
           

            return this.$message.info(res.data.msg);
          } else if (res.data.status == 200) {
 
            this.score = res.data.score;
            this.orderTable = res.data.order;
          }
        })
        .catch(error => {
          console.log(error);
          return this.$message.error("系统错误！");
        });
    },
    
  }
};
</script>


<style lang='less' scoped>
.chongzhijifen {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .commitBtn {
    margin-top: 10px;
  }
}

.el-tabs {
  margin: 30px;
}
.el-menu {
  height: 100%;
}
.avatar_box {
  border: 1px solid #eee;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: 0 auto;
  background-color: #fff;

  img {
    background-color: #fff;
  }
}
.username {
  margin: 0 auto;
  text-align: center;
}
.container {
  height: 100%;

  .el-card {
    height: 100%;
  }
}

.el-row {
  height: 800px;
  .el-col {
    height: 100%;
  }
}

.myjifen {
  display: flex;
  margin-top: 20px;
  font-size: 18px;
  justify-content: space-between;
  .el-tag {
    font-size: 18px;
  }
}
.box-card {
  margin-top: 20px;
  background-color: #eee;
}

/* 媒体查询 */
@media screen and (max-width: 777px) {
 
  .wechat {
    width: 90%;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

/* 媒体查询 */
@media screen and (min-width: 777px) {

  .wechat {
    width: 60%;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>