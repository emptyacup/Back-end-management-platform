import Vue from 'vue'
import App from './App.vue'
import { Button, Select, Container, Main, Header, Aside, Footer, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem,Tag,Form,FormItem,Input,Switch,DatePicker,Option,Dialog,Pagination,MessageBox,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import './assets/less/index.less'
import store from './store'
import http from 'axios'
import '../api/mock.js'


Vue.config.productionTip = false


Vue.use(Select)
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)





Vue.prototype.$http = http   //绑定插件到vue

//element ui 的 
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message


router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  let token = store.state.user.token
  if(!token && to.name !=='login'){    //强迫你去login
    next({name:'login'})
  } else if(token && to.name ==='login'){   //不让你去login
    next({name:'home'})
} else {
    next()
  }
})



new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
