import request from '@/utils/request'

const API_PATH = 'user/ucenter/member'
const WX_API_PATH = 'user/ucenter/wx'

export default {
    //用户登录
    submitLogin(loginVO) {
        return request({
            url: `${API_PATH}/userLogin`,
            method: 'POST',
            data: loginVO
        })
    },

    // 根据token获取用户信息
    getUserInfo() {
        return request({
            url: `${API_PATH}/getUserInfo`,
            method: 'GET'
        })
    },

    // 微信扫码
    wxScan() {
        return request({
            url: '/api/ucenter/wx/userLogin',
            method: 'get'
        })
    },

  updatePassword(data) {
    return request({
      url: '/user/ucenter/member/updatePassword',  // 后续根据后端实际动态调整
      method: 'post',
      data
    })
  },
}
