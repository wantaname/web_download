<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的反馈</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="newMessage">新建</el-button>
      </div>
      <div>
        <el-table
          :data="myFeedback"
          ref="feedbackRef"
          style="width: 100%"
          @row-click="expandRow"
          height="400px"
        >
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template slot-scope="props">
             
              <div class="content">
                <p class="send">发送</p>
                <p>{{props.row.content}}</p>
              </div>
              <div class="content">
                <p class="send">回复</p>
                <p>{{props.row.reply}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <el-tag size="medium" type="info">{{ scope.row.content }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                type="warning"
                v-if="scope.row.state=='待处理'"
              >{{ scope.row.state }}</el-tag>
              <el-tag size="medium" type="success" v-else>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 添加消息对话框 -->
    <el-dialog title="添加消息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item prop="message">
          <el-input type="textarea" v-model="addForm.message" rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMessage">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "qq",
      addDialogVisible: false,

      myFeedback: [],

      addForm: {
        message:''
      },
      addFormRules: {
        message: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getFeedback();
  },
  methods: {
    expandRow(row, column, event) {
      if (column.label !== "操作") {
        this.$refs.feedbackRef.toggleRowExpansion(row);
      }
    },
    handleDelete(id) {
      this.$http
        .delete("/account/deleteFeedback", {
          data: { id }
        })
        .then(res => {
          if (res.data.status == 200) {
            this.getFeedback();
            this.$message.success("删除成功");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    newMessage() {
      this.addDialogVisible = true;
    },
    getFeedback() {
      this.$http
        .get("/account/getFeedback")
        .then(res => {
          if (res.data.status == 200) {
            this.myFeedback = res.data.myFeedback;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    submitMessage() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return;
        } else {
          this.$http
            .post("/account/feedback", {
              content: this.addForm.message
            })
            .then(res => {
              if (res.data.status == 404) {
                this.$message.error("用户未登录");
                this.$router.push("/login");
              } else if (res.data.status == 300) {
               
                return this.$message.error(res.data.msg);
              } else if (res.data.status == 200) {
                //   刷新
                this.getFeedback();
                this.addDialogVisible = false;
                return this.$message.success("发送成功");
              }
            })
            .catch(error => {
              console.log(error);
              return this.$message.error("系统错误！");
            });
        }
      });
    }
  }
};
</script>


<style lang='less' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-card {
  margin: 30px;
  background-color: #f0ffff;
  height: 100%;
  .el-table {
    background-color: #fff8dc;
  }
}
.content {
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  .send{
    color: #99a9bf;
  }
}
.container {
  height: 100%;

  .qq {
    margin: 20px;
  }
}
</style>