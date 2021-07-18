<template>
  <el-card class="box-card">
    <el-form :label-position="labelPosition" ref="registerForm"  label-width="80px" :model="user" :rules="rules">
      <h3>用户注册</h3>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="user.sex" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in sexOption"
            :key="item.value"
           :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="user.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: 'register',
  data() {
    return {
      rules: {
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        },
      labelPosition: 'right',
      sexOption: [
        {
          value: 0,
          label: '男',
        },
        {
          value: 1,
          label: '女',
        }
      ],
      user: {
        name: null,
        sex: null,
        tel: null,

      }
    }
  },
  methods: {
    ...mapActions([
      'submitRegister'
    ]),
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitRegister(this.user).then(res => res.json()).then(res => {
              if (res.insertId !== undefined) {
                this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success'
                });
              } else if (res.errno) {

                if (res.errno === 1062) {
                  this.$message({
                    showClose: true,
                    message: '这个昵称已经有小伙伴用了哦',
                    type: 'error'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: `出错啦:${res.sqlMessage}`,
                    type: 'error'
                  });
                }
              }


            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
  resetForm(formName) {
        this.$refs[formName].resetFields();
   }


}

</script>

<style scoped>

.box-card {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -200px;
}


</style>










