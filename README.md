# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 可用脚本

In the project directory, you can run:

### `npm install`

安装项目依赖

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## 项目配置

### 1 creat a new project

```
# 创建my-app项目
npx create-react-app my-app

# 进入到项
cd my-app

# 启动项目
npm start
```

### 2 整理项目结构

```
-src
  -apis           项目接口函数
  -assets         项目资源文件，比如，图片等
  -components     通用组件
  -pages          页面组件
  -router         路由配置
  -store          集中状态管理
  -utils          工具，比如，token、axios 的封装等
  -App.js         根组件
  -index.css      全局样式
  -index.js       项目入口
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
```

```jsx
const App = () => {
  return <div>this is app</div>
}

export default App
```

### 3 @别名配置

项目背景：在业务开发过程中文件夹的嵌套层级可能会比较深，通过传统的路径选择会比较麻烦也容易出错，设置路径别名可以简化这个过程

#### 路径编译配置

1. 安装 `craco` 工具包
2. 增加 `craco.config.js` 配置文件
3. 修改 `scripts 命令`
4. 测试是否生效

```bash
npm i @craco/craco -D
```

```javascript
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  }
}
```

#### 提示配置（不配置可能会报错）

**实现步骤**

1. 在项目根目录创建 `jsconfig.json` 配置文件
2. 在配置文件中添加以下配置

**代码实现**

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

说明：VSCode与WebStorm会自动读取`jsconfig.json` 中的配置，让ide知道@就是src目录

### 4 整合scss预处理器

#### 实现步骤

1、安装解析 sass 的包：npm i sass -D

2、创建全局样式文件：src/index.scss

3、测试scss是否能正常工作：

```scss
body {
  margin: 0;
  div {
    color: blue;
  }
}
```

### 5 集成antd组件库

#### 安装antd

```
npm install antd --save
```

#### 使用antd

```jsx
import { Button } from 'antd';
const App = () => {
  return <div><Button>click me</Button></div>
}

export default App
```

### 6 配置react-router路由

#### 安装react-router-dom

```
npm i react-router-dom
```

#### 代码实现

`pages/Layout/index.js`

```jsx
const Layout = () => {
  return <div>this is layout</div>
}
export default Layout
```

`pages/Login/index.js`

```jsx
const Login = () => {
  return <div>this is login</div>
}
export default Login
```

`router/index.js`

```jsx
import {createBrowserRouter} from 'react-router-dom'

import Login from '../pages/Login'
import Layout from '../pages/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
])

export default router
```

`index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import router from './router'
import {RouterProvider} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
```

### 7 配置axios请求库

**实现步骤**

1. 安装 axios 到项目
2. 创建 utils/request.js 文件
3. 创建 axios 实例，配置 `baseURL，请求拦截器，响应拦截器`
4. 在 utils/index.js 中，统一导出request

```bash
npm i axios
```

```javascript
import axios from 'axios'

// 配置请求实例
const request = axios.create({
    baseURL: 'http://example.com',
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
    return config
}, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    console.log(response)
    return response.data
}, (error)=> {
    console.log(error)
    return Promise.reject(error)
})

export { request }
```

```javascript
import { request } from './request'
export { request }
```

### 8 集成redux状态管理

#### 安装Redux相关工具包

```bash
npm i react-redux @reduxjs/toolkit
```

#### 配置Redux

```javascript
import {createSlice} from '@reduxjs/toolkit'

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        token: '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
        }
    }
})

// 解构出actionCreator
const {setToken, setUserInfo, clearUserInfo} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

export default userReducer
```

```javascript
// 组合redux子模块 + 导出store实例

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'

export default configureStore({
    reducer: {
        user: userReducer
    }
})
```

`@/index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.scss'
import router from '@/router'
import {RouterProvider} from 'react-router-dom'
import {Provider} from "react-redux";
import store from "@/store";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
```

## 集成功能

### 登录模块

`pages/Login/index.js`

```jsx
import './index.scss'
import {Card, Form, Input, Button} from 'antd'

const Login = () => {
    // form绑定了onFinish事件，当表单提交时自动触发，并将表单数据作为参数传入
    const onFinish = (values) => {
        console.log('Received values of form: ', values)
    }
    return (
        <div className="login">
            <Card className="login-container">
                <Form onFinish={onFinish} validateTrigger={['onBlur']}>
                    <Form.Item
                        name="mobile"
                        // 多条校验规则，按顺序执行串行校验
                        rules={[
                            {required: true, message: '请输入手机号'},
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号"/>
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[
                            {required: true, message: '请输入验证码'},
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" maxLength={6}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
```

`pages/Login/index.scss`

```scss
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}
```

## 规范类配置

参考文献：
https://segmentfault.com/a/1190000044085567#item-1
https://segmentfault.com/a/1190000041847944
https://blog.csdn.net/sinat_36728518/article/details/106971471

整合以下工具：
eslint
prettier
git hooks
husky
lint-staged
commitlint
stylelint



