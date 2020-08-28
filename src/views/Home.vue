<template>
  <div class="home">
    <div class="myart">
      <Myechat></Myechat>
    </div>
    <div class="mypie_chat">
      <Mychart_bar></Mychart_bar>
    </div>
  </div>
</template>

<script>
import Myechat from "../components/Myechat";
import Mychart_bar from "../components/Mychart_pie";
export default {
  components: {
    Myechat,
    Mychart_bar,
  },
};
</script>

<style scoped>
.myart {
  width: 100%;
  height: 200px;
}
.mypie_chat {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}
</style>
