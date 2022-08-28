import axios from './axios'

// 获得后端资料

export const getMenu=(param)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param,
        
    })
    
}

export const getData =()=>{
    return axios.request({
        url:'/basehome/getData',
    })
}

export const getUser= (params)=>{
    return axios.request({
        url:'user/getUser',
        method:'get',
        params
    })
}

// export const getMenu= (params)=>{
//     return axios.request({
//         url:'/permission/getMenu',
//         method:'post',
//         data:param,
        
//     })
// }