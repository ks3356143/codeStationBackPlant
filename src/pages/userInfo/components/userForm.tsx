import userApi from "@/api/user";
import {
    ProForm,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import { useLocation, useNavigate, useParams } from "@umijs/max";
import { Button, Col, Row, Space } from "antd";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { UserType } from "../types";

type Props = {
    type?: "add";
};

const UserForm = ({ type }: Props) => {
    const UploadComponent = ProFormUploadButton as any;
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const location = useLocation();
    const initialData: any = location.state;
    const params = useParams();

    // 处理头像格式和判断编辑和新增
    const getInitialValues = () => {
        if (!initialData) return {};

        return {
            ...initialData,
            // 转换头像字段格式
            avatar: initialData.avatar
                ? [
                      {
                          uid: "-1",
                          name: "avatar",
                          status: "done",
                          url: API_URL + initialData.avatar,
                      },
                  ]
                : [],
        };
    };

    const handleFinish = async (value: UserType) => {
        startTransition(async () => {
            if (type === "add") {
                try {
                    const avatar = changeAvatarToString(value.avatar);
                    await userApi.addUser({ ...value, avatar });
                    toast.success("新增用户成功，跳转列表页");
                    navigate("/userInfo/userList");
                } catch (e) {
                    toast.error(e.response?.data?.errorMessage);
                }
            } else {
                try {
                    const avatar = changeAvatarToString(value.avatar);
                    await userApi.updateUser(params.id, {
                        ...value,
                        avatar,
                        id: params.id,
                    });
                    toast.success("修改用户成功，跳转会列表页");
                    navigate("/userInfo/userList");
                } catch (e) {
                    toast.error(e.response?.data?.errorMessage);
                }
            }
        });
    };

    // 工具函数，转换头像url
    const changeAvatarToString = (text: any) => {
        if (!text) return undefined;
        const avatar =
            text.length > 0
                ? text[0].url
                    ? text[0].url.replace(API_URL, "")
                    : text[0].response.data
                : undefined;
        return avatar;
    };

    const formRef = useRef(null);
    return (
        <div>
            <ProForm<UserType>
                onFinish={handleFinish}
                formRef={formRef}
                layout="horizontal"
                initialValues={getInitialValues()}
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
                                            onClick={() => {
                                                props.form?.submit?.();
                                            }}
                                            loading={isPending}
                                        >
                                            {type === "add"
                                                ? "确认新增"
                                                : "提交修改"}
                                        </Button>
                                        {
                                            <Button
                                                key="rest"
                                                onClick={() =>
                                                    props.form?.resetFields()
                                                }
                                                disabled={isPending}
                                            >
                                                重置
                                            </Button>
                                        }
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
                    disabled={type !== "add"}
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
                    name="wechat"
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
