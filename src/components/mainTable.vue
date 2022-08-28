<template>
  <div class="main-table">
    <el-table :data="tableData" height=" 700px " stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
      <!--  不理解template 但是他的确可以传参，也不知道怎么获取数据的 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelect(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination 分页功能 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="configs.page"
      @current-change="changePage()"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "mainTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {
      configs:this.config
    };
  },

  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelect(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang='less' scoped>
.main-table {
  height: calc(100%-62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>