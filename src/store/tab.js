
import Cookie from 'js-cookie'
export default{
    state:{
        isCollapse:false,
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state,val){
            if(val.name !== 'home'){
                state.currentMenu = val;
                const result =state.tabList.findIndex(item=> item.name===val.name)   //获得相应位置
                if(result === -1){
                    state.tabList.push(val)
                }
            } else {
                state.currentMenu=null
            }
        },
        closeTag(state,val){
            const result=state.tabList.findIndex(item =>item.name===val.name)
            console.log(result)
            state.tabList.splice(result,1)
        },
        setMenu(state,val){        //应该是数据传入cookie （取名太la了）
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))    //把cookie当库使用 ，要转义字符串
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){            //添加 组件 
            if(!Cookie.get('menu')){
                return
            } 
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray =[]
            menu.forEach(item => {            //遍历完，制作component
                if(item.children){
                    item.children=item.children.map(item =>{
                        item.component =()=>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else {
                    item.component = ()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由动态添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item)     //router自带addRoute(添加到Main的children)
            })
        }
    }
}