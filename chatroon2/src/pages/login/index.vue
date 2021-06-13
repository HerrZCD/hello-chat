<template>

    <div class="wrapper">
      <h2>CHAT,Safe,Fast</h2>
      <div class="box">
        <h3>输入昵称以开始</h3>
        <div class="input-wrapper">
          <el-input v-model="userName" placeholder="请输入昵称" style="width: 255px" @keyup.enter="login"></el-input>
          <el-button type="primary" @click="login()" class="login-btn">开始聊天</el-button>
        </div>
      </div>
    </div>
 
</template>

<script>
export default {
  name: 'login',
//   props: {
//     msg: String
//   }
  data() {
    return {
      userName: '',
    }
  },

  methods: {
    login() {
      // debugger
      this.userName.trim();
      if (!this.userName) {
        alert('请输入合法的用户名');
        return 
      }
      const params = {
        name: this.userName
      }
      fetch( "http://localhost:3000/api/data", 
        {
              method: 'POST', // or 'PUT'
              body: `name=${this.userName}`, //'{"name":"hehe","age":10}'
              headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
          })
        }
              )
            .then(res=>res.json())
            .then(data => {
              if (data.flag === 1) {
                 this.$message({
                    type: 'info',
                    message: '用户名已经被占用'
                  });
              } else if (data.flag === 0) {
                    this.$router.push({path:'chat', query:{
                                                        name: this.userName
                                                    }
                                    })
              }
            })
            .catch(function (e) {
            console.log('oops! error:',e.message)
            })
    }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .wrapper {
    width: 100%;
    margin-top: 12%;
  }

  h3 {
    margin-top: 50px;
  }

  .input-wrapper {
    display: flex;
    width: 100%;
    margin-top: 50px;
    justify-content: center;
  }

  .login-btn {
    margin-left: 15px;
  }


  .box {
    width: 500px;
    height: 200px;
    border-radius: 4px;
    border: 1px #ebebeb solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }

</style>
