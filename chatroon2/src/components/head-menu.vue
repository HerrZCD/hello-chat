<template>

  <div class="wrapper">
    <div class="user-name">{{uname}}</div>
  </div>

</template>


<script>
export default {

  props: {
    uname: String,
  },
  data() {
    return {
      
    }
  }


}
</script>
<style scoped>

.user-name {
  fontsize: 30px;
  color: #fff;
  width: 100px;
  line-heigt: 50px;
  text-align: center;

}
.wrapper {
  width: 100%;
  height: 50px;
  background-color: #666;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
}

</style>
