<template>
  <div class="tabs">
    <!-- $route 当前路由信息-->
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      size="small"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"      
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >{{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'mainTag',
    data(){
        return {}
    },
    computed:{       
        ...mapState({
            tags:state => state.tab.tabList
        })
    },
    methods:{
        ...mapMutations([
            'closeTag'
        ]),
        changeMenu(item){
            this.$router.push({ name: item.name })
        },
        handleClose(tag,index){
            const length = this.tags.length - 1
            this.closeTag(tag)
            if(tag.name!==this.$route.name){
                return ;
            }
            if(index ===length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            } else {
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script >

<style lang='less' scoped>
.tabs{
    padding:20px;
    .el-tag{
        margin-right:15px;
        cursor:pointer;       //光标（鼠标）改变成手

    }
}
</style>