<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card shadow="always">
    <el-row>
  <el-col :span="7">
   
      <div class="avatar_box">
        <el-avatar :size="75" :src="avatar"></el-avatar>
      </div>
      <div class="username"><h4>{{username}}</h4></div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router
     >
      <el-menu-item index="jifen">
        <i class="el-icon-coin"></i>
        <span slot="title">我的积分</span>
      </el-menu-item>
      <el-menu-item index="qq">
        <i class="el-icon-bangzhu"></i>
        <span slot="title">账号绑定</span>
      </el-menu-item>
      <el-menu-item index="feedback">
        <i class="el-icon-message"></i>
        <span slot="title">反馈消息</span>
      </el-menu-item>
      <el-menu-item index="login">
        <i class="el-icon-turn-off"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="17">
      <router-view></router-view>
  </el-col>
    </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            url:'',
            avatar:require('./logo.png'),
            username:''
        }
    },
    created(){
      this.getUserInfo()
    },
    methods:{
      getUserInfo(){
        this.$http
        .get("/account/getUserInfo")
        .then(res => {
          if (res.data.status == 404) {
            
            this.$router.push("/login");
          }
          else if(res.data.status == 400)
          {
            return this.$message.error("加载失败，请稍后再试！");
          }
          else if(res.data.status == 300)
          {
           
            return this.$message.info(res.data.msg)
          }
          else if (res.data.status == 200) 
          {
            this.username= res.data.username
          
          }
        })
        .catch(error => {
  
          console.log(error);
          return this.$message.error("网络错误！");
          
        });
      }
    }

}
  
</script>


<style lang='less' scoped>
.el-menu{
    height: 100%;
}
.avatar_box{
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
.username{
      margin: 0 auto;
      text-align: center;
}
.container{
    height: 100%;

    .el-card{
        height: 100%;
        
    }
}

.el-row{
    height: 777px;
    .el-col{
        height: 100%;
    }
}

.el-input{
    margin: 20px;
    width:80%;
}
</style>