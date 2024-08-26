import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken,removeToken } from '@/utils/index'

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo (state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo (state) {
            state.token = ''
            removeToken()
            state.userInfo = {}
        }
    }
})

// 解构出actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

export default userReducer
