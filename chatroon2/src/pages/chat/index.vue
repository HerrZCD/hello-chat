<template>

    <div class="wrapper">
        <h3>群聊</h3>
    
      <div class="message-panel">
        <msg-box v-for="(item, index) of msgList" :key="index+Math.random()" :uname="item.name" :content="item.msg" :isself="item.isSelf"></msg-box>

      </div>
      <div class="input-area">
          <textarea class="input" v-model="msg" @keyup.enter="sendMsg"></textarea>
          <!-- <button class="send" @click="sendMsg">发送</button> -->
          <el-button class="send-btn" @click="sendMsg">发送</el-button>

      </div>
    </div>
 
</template>

<script>
import msgBox from './msgBox.vue';

export default {
  name: 'chat',
//   props: {
//     msg: String
//   }
  data() {
    return {
      content: 'hahhahaha',
      userName: '',
      msg: '',
      msgList: [],
    }
  },
  components: {
      msgBox,
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
            // this.msgList.push(`${data.name}说:${data.msg}`)
            this.msgList.push({
                name: data.name === this.userName ? '我' : data.name,
                msg: data.msg,
                isSelf: data.name === this.userName
            })
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
        position: relative;
        width: 650px;
        height: 610px;
        border-radius: 4px;
        border: 1px #ebebeb solid;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;

    }
    .message-panel {
        width: 85%;
        height: 350px;
        border-top: 1px #ebebeb solid;
        border-bottom: 1px #ebebeb solid;
        overflow: scroll;
        overflow-x: hidden;
        padding: 10px;

    }
    .input-area {
        width: 85%;
        border-radius: 4px;
        height: 120px;
        margin-top: 20px;
        border:0 solid black;
    }

    .send-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .input {
        width: 100%;
        height: 100%;
        border:  0px #ebebeb solid;
        border-radius: 4px;
        outline: none;
        padding: 5px;
    }

  

</style>    