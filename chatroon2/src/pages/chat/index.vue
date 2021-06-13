<template>

    <div class="wrapper">
        <h3>群聊</h3>
    
      <div class="message-panel">
        <div class="message" v-for="(msg, index) of msgList" :key="index">{{msg}}</div>

      </div>
      <div class="input-area">
          <textarea class="input" v-model="msg"></textarea>
          <button class="send" @click="sendMsg">发送</button>

      </div>
    </div>
 
</template>

<script>
export default {
  name: 'chat',
//   props: {
//     msg: String
//   }
  data() {
    return {
      userName: '',
      msg: '',
      msgList: [],
    }
  },
  mounted() {
      this.userName = this.$route.query.name;
      this.$socket.emit('login', {
          userid: 1,
          username: this.userName
      })
  },
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        message: function (data) {
            console.log(data)
            this.msgList.push(`${data.name}说:${data.msg}`)
        }
    },
    methods: {
        sendMsg: function () {
            // $socket is socket.io-client instance
            const data = {
              name: this.userName,
              msg: this.msg
            }
            this.$socket.emit('message', data)
            this.msg = '';
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrapper {
        width: 650px;
        height: 610px;
        border-radius: 4px;
        border: 1px #ebebeb solid;
        box-shadow: 10px 10px 5px #888888;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;

    }
    .message-panel {
        width: 85%;
        height: 350px;
        border: 1px #ebebeb solid;
        overflow: scroll;

    }
    .input-area {
        width: 85%;
        border-radius: 4px;
        height: 120px;
        margin-top: 20px;

    }
    .input {
        width: 100%;
        height: 100%;
        border:  1px #ebebeb solid;
        border-radius: 4px;
        outline: none;
        padding: 5px;
    }

  

</style>    