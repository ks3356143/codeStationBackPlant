import {
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Col, Row, Space } from "antd";
import { useRef } from "react";
import { UserType } from "../types";

type Props = {
    type?: "add";
};

const UserForm = ({ type }: Props) => {
    const UploadComponent = ProFormUploadButton as any;
    const handleFinish = async (value: UserType) => {
        // 只有在校验通过才执行
    };
    const formRef = useRef(null);
    return (
        <div>
            <ProForm<UserType>
                onFinish={handleFinish}
                formRef={formRef}
                layout="horizontal"
                labelCol={{ flex: "120px" }} // 固定宽度，包含星号空间
                wrapperCol={{ flex: 1 }}
                submitter={{
                    render: (props) => {
                        return (
                            <Row>
                                <Col span={24} offset={6}>
                                    <Space>
                                        <Button
                                            key="submit"
                                            type="primary"
                                            onClick={() =>
                                                props.form?.submit?.()
                                            }
                                        >
                                            {type === "add"
                                                ? "确认新增"
                                                : "提交修改"}
                                        </Button>
                                        {type === "add" && (
                                            <Button
                                                key="rest"
                                                onClick={() =>
                                                    props.form?.resetFields()
                                                }
                                            >
                                                重置
                                            </Button>
                                        )}
                                    </Space>
                                </Col>
                            </Row>
                        );
                    },
                }}
            >
                <ProFormText
                    name="username"
                    label="登录账号"
                    placeholder="请输入登录账号"
                    rules={[{ required: true, message: "登录账号必填" }]}
                />
                <ProFormText.Password
                    name="password"
                    label="登录密码"
                    placeholder="请输入登录密码"
                    rules={[{ required: true, message: "登录密码必填" }]}
                />
                <ProFormText
                    name="name"
                    label="用户昵称"
                    placeholder="请输入用户昵称"
                    rules={[{ required: true, message: "用户昵称必填" }]}
                />
                <UploadComponent
                    label="头像"
                    name="avatar"
                    action="/api/common/avatar"
                    max={1}
                    listType="picture-card"
                />
                <ProFormText
                    name="email"
                    label="邮箱"
                    placeholder="请输入用户邮箱"
                />
                <ProFormText
                    name="qq"
                    label="QQ号码"
                    placeholder="请输入QQ号码"
                />
                <ProFormText
                    name="微信"
                    label="微信号码"
                    placeholder="请输入微信号码"
                />
                <ProFormTextArea
                    name="intro"
                    label="自我介绍"
                    placeholder="请输入自我介绍"
                    fieldProps={{
                        autoSize: {
                            minRows: 5,
                            maxRows: 10,
                        },
                    }}
                />
            </ProForm>
        </div>
    );
};

export default UserForm;
