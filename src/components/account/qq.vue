<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <!--  -->
      <el-tab-pane label="绑定QQ" name="qq"></el-tab-pane>

      <el-alert title="绑定QQ号可以同步积分" type="warning" close-text="知道啦"></el-alert>
      <div style="height: 300px;" class="qq">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入QQ号" v-model="qq" v-if="bangding" disabled>
            <el-button slot="append">已绑定</el-button>
          </el-input>
          <el-input placeholder="请输入QQ号" v-model="qq" v-else>
            <el-button slot="append" @click="commit">绑定</el-button>
          </el-input>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "qq",
      qq:'',
      bangding:false
    };
  },
  created(){
    this.getqq()
  },
  methods: {
    getqq(){
      this.$http
        .get("/account/getqq")
        .then(res => {
          if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          } else if (res.data.status == 300) {
            console.log(res.data.msg);
            return this.$message.error(res.data.msg);
          } else if (res.data.status == 200) {
            if(res.data.qq===''){
              this.bangding=false
            }else{
               this.bangding=true,
               this.qq=res.data.qq
            }
          }
        })
        .catch(error => {
          console.log(error);
          return this.$message.error("系统错误！");
        });
    },
    commit(){
      this.$http
        .post("/account/qq", {
          qq: this.qq,
        })
        .then(res => {
          if (res.data.status == 404) {
            this.$message.error("用户未登录");
            this.$router.push("/login");
          } else if (res.data.status == 300) {
            console.log(res.data.msg);
            return this.$message.error(res.data.msg);
          } else if (res.data.status == 200) {
            this.getqq()
            return this.$message.success(
              "绑定成功！"
            );
          }
        })
        .catch(error => {
          console.log(error);
          return this.$message.error("系统错误！");
        });
    }
  }
};
</script>


<style lang='less' scoped>
.el-tabs {
  margin: 30px;
}

.container {
  height: 100%;

  .qq {
    margin: 20px;
  }
}
</style>