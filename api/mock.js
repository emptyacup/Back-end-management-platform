import Mock from 'mockjs'
import homeApi from './mockServeData'
import userApi from './mockServeDates/user'
import permissionsApi from './mockServeDates/permission'


Mock.mock('/basehome/getData',homeApi.getStatisticalData)    //模拟端口，网址
Mock.mock(/user\/add/,'post',userApi.createUser)        //模拟端口，正则
Mock.mock(/user\/edit/,'post',userApi.updateUser)

Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionsApi.getMenu)