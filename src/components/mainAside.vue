<template>
<!--  collapse  侧栏伸缩 -->
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color='#545c64'
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  ><h3>{{isCollapse ?'后台':'通用后台管理系统'}}</h3>
  <!-- menu-item 包裹菜单单项  可被menu-item-group包裹 -->
    <el-menu-item
      v-for="item in noChildren"
    @click="clickMenu(item)"
      :key="item.path"
      :index="item.path+''"
    >
      <i :class="'el-icon-'+ item.icon" ></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- submen => 拥有子菜单    母菜单用template包裹  -->
    <el-submenu v-for='item in hasChildren' :key='item.path' :index="item.path+''">       
      <template slot="title">
        <i :class="'el-icon-'+ item.icon" ></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for='(subItem,subIndex) in item.children' :key='subItem.path' >
        <span slot="title">分组{{subIndex+1}}</span>
        <el-menu-item :index="subIndex+''" @click="clickMenu(subItem)" >{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
    

<script>
export default {
  name: "mainAside",
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        this.$router.push({
            name:item.name
        })
        this.$store.commit('selectMenu',item)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse(){                         
        return this.$store.state.tab.isCollapse
    },
    asyncMenu(){
      console.log(this.$store.state.tab.menu,'menu')
      return this.$store.state.tab.menu
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100%;
    border:none;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;

    }
}
</style>