<template>
  <div class="manage">
    <div v-if="isShow" >
      <!--dialog   弹出框     有一个bug，有缓存需要要再v-if包裹-->
      <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync="isShow"
      >
        <mainForm
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
        >
        </mainForm>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="manage-header">
      <el-button type="primary" @click="addUser" style=" margin-bottom: 10px;">+ 新增</el-button>
      <mainForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </mainForm>
    </div>
    <main-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getlist()"
      @edit="editUser"
      @del="delUser"
    ></main-table>
  </div>
</template>

<script>
import mainForm from "../../components/mainForm";
import mainTable from "../../components/mainTable";
import { getUser } from "../../../api/data";
export default {
  name: "userSet",
  components: { mainForm, mainTable },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birtg: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res);
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          console.log(res);
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birtg: "",
        sex: "",
      };
    },
    getList(name = "") {   //name=""可能有/无参数
      //获取/重置信息
      this.config.loading = true;
      console.log(name)
      // 判断是否为搜索姓名
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        console.log(res, "res");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editUser(row) {
      //'设置'事件
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      //'删除'事件
      this.$confirm("此操作将删除该组件", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='less' scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>