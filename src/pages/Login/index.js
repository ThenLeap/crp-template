import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    // form绑定了onFinish事件，当表单提交时自动触发，并将表单数据作为参数传入
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async formValue => {
        // await dispatch(fetchLogin(formValue))
        navigate('/')
        message.success('登录成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <Form onFinish={onFinish} validateTrigger={['onBlur']}>
                    <Form.Item
                        name="mobile"
                        // 多条校验规则，按顺序执行串行校验
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[
                            { required: true, message: '请输入验证码' },
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" maxLength={6} />
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
