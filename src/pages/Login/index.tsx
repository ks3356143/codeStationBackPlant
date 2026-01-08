import userApi from "@/api/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
    ProForm,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Slider } from "antd";
import { useState, useTransition } from "react";
import ReactCanvasNest from "react-canvas-nest";
import { toast } from "react-toastify";
import styles from "./index.module.less";
import { ILoginValue } from "./types";

const Login = () => {
    const [isPending, startTransition] = useTransition();
    // 滑块
    const [sliderValue, setSliderValue] = useState(0);
    const handleFinish = (value: ILoginValue) => {
        // 判断滑块是否在终点
        if (sliderValue < 100) {
            toast.error("请移动滑块到终点!");
            return;
        }
        // 全部具备条件则登录
        startTransition(async () => {
            try {
                const res = await userApi.login({ ...value });
                const token = res.data.access;
                localStorage.setItem("adminToken", token);
                location.href = "/";
            } catch (e) {
                const errMessage = e.response?.data?.errorMessage;
                toast.error(errMessage ? errMessage : "登录失败，请检查输入");
                console.log(e);
            } finally {
                setSliderValue(0);
            }
        });
    };
    // 渲染美丽的全局页面
    return (
        <div>
            <ReactCanvasNest
                config={{
                    pointColor: "255, 0, 0",
                    count: 50,
                    follow: false,
                }}
                style={{ zIndex: 1 }}
            />
            <div className={styles.container}>
                <h1>CoderStation 后台管理系统</h1>
                <ProForm
                    name="normal_login"
                    className="login-form"
                    layout="horizontal"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleFinish}
                    submitter={{
                        render(props) {
                            return (
                                <Button
                                    loading={isPending}
                                    type="primary"
                                    style={{
                                        width: "100%",
                                        marginTop: "-20px",
                                    }}
                                    onClick={() => props?.submit()}
                                >
                                    登录
                                </Button>
                            );
                        },
                    }}
                >
                    {/* 账号 */}
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: "large",
                            prefix: <UserOutlined />,
                            allowClear: true,
                        }}
                        placeholder="请输入管理员账户"
                        rules={[{ required: true, message: "管理员账号必填" }]}
                    ></ProFormText>

                    {/* 密码 */}
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: "large",
                            prefix: <LockOutlined />,
                            allowClear: true,
                        }}
                        placeholder="请输入管理员密码"
                        rules={[{ required: true, message: "密码必填" }]}
                    ></ProFormText.Password>

                    {/* 滑块 */}
                    <ProForm.Item>
                        <Slider
                            range={false}
                            defaultValue={0}
                            max={100}
                            value={sliderValue}
                            keyboard={false}
                            onChange={(value) => {
                                setSliderValue(value);
                            }}
                            onChangeComplete={(value) => {
                                // 当不为100时候，设置为0
                                if (value < 100) {
                                    setSliderValue(0);
                                }
                            }}
                            tooltip={{
                                open: false,
                            }}
                            styles={{
                                rail: {
                                    color: "red",
                                },
                            }}
                        />
                    </ProForm.Item>

                    {/* 7天记录 */}
                    <div style={{ height: "45px" }}>
                        <ProFormCheckbox name="remember">
                            7天免登录
                        </ProFormCheckbox>
                    </div>
                </ProForm>
            </div>
        </div>
    );
};

export default Login;
