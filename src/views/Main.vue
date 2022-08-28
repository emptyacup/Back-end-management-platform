<template>
  <el-container style="height: 100%">
    <main-aside></main-aside>
    <el-container>
      <el-header>
        <main-header></main-header>
      </el-header>
      <mainTag></mainTag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mainAside from "../components/mainAside.vue";
import mainHeader from "../components/mainHeader.vue";
import mainTag from "../components/mainTag.vue";
export default {
  name: "componentHome",
  components: { mainAside, mainHeader, mainTag },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>