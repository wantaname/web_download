<template>
  <div class="login_container">
    <transition name="el-zoom-in-center">
      <div class="login_box" v-if="showLogin">
        <div class="avatar_box">
          <img src="./logo.png" alt />
        </div>

        <el-form
          :model="loginForm"
          label-width="0"
          class="login_form"
          :rules="loginFormRules"
          ref="loginFormRef"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>

            <el-button type="text" @click="showLogin=!showLogin">去注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <transition name="el-zoom-in-center">
      <div class="login_box" v-if="!showLogin">
        <div class="avatar_box">
          <img src="./logo.png" alt />
        </div>

        <el-form
          :model="registerForm"
          label-width="0"
          class="login_form"
          :rules="registerFormRules"
          ref="registerFormRef"
        >
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="register">注册</el-button>

            <el-button type="text" @click="showLogin=!showLogin">去登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ]
      },

      // register
      registerForm: {
        username: "",
        password: ""
      },
      registerFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    showLogin: function(val) {
      if (val) {
        this.$refs.registerFormRef.resetFields();
      } else {
        this.$refs.loginFormRef.resetFields();
      }
    }
  },
  methods: {
    login() {
      // 表单预验证
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("/user/login", this.loginForm)
          .then(res => {
            if (res.data.status == 400) return this.$message.error("系统错误");
            if (res.data.status == 300)
              return this.$message.error("账号或密码错误!");
            if (res.data.status == 200) {
              window.localStorage.setItem("token", res.data.token);
              this.$router.push("/");

              return this.$message.success("登录成功!");
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    //register
    register() {
      // 表单预验证
      this.$refs.registerFormRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("/user/register", this.registerForm)
          .then(res => {
            if (res.data.status == 400)
              return this.$message.error("该用户名已存在！");
            if (res.data.status == 300)
              return this.$message.error("账号密码不合法!");
            if (res.data.status == 200) {
              this.showLogin = true;
              return this.$message.success("注册成功!");
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
.btns {
  margin-bottom: 8px;
  .el-button {
    width: 100%;
    display: block;
    margin-left: 0;
  }
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;

  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    width: 100px;
    height: 100px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

/* 媒体查询 */
@media screen and (max-width: 777px) {
  .login_box {
    width: 85%;
    height: 300px;
  }
}

/* 媒体查询 */
@media screen and (min-width: 777px) {
  .login_box {
    width: 450px;
    height: 300px;
  }
}
</style>