import { PlusOutlined } from "@ant-design/icons";
import {
    ProForm,
    ProFormInstance,
    ProFormItem,
    ProFormRadio,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, Row, Space, Upload } from "antd";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { DataType } from "../types";
import { normFile } from "./fixUtils";

type Props = {
    type?: "add";
    adminInfo: DataType;
    setAdminInfo: Dispatch<SetStateAction<DataType>>;
    submitClick: (reset: () => void) => Promise<void>;
    submitting: boolean;
    open?: boolean;
};

// 公共表单页面，用于新增、修改管理员
const AdminForm = ({
    type,
    adminInfo,
    setAdminInfo,
    submitClick,
    submitting,
    open,
}: Props) => {
    const formRef = useRef<ProFormInstance>(null);
    // 清除表单
    const reset = () => {
        formRef.current?.resetFields();
    };

    // 当open变化修改内容
    useEffect(() => {
        if (open) {
            formRef.current?.setFieldsValue(adminInfo);
        }
    });

    return (
        // 注意：ProForm中onFinish是校验通过后才进入的函数
        <ProForm
            formRef={formRef}
            layout="horizontal"
            labelCol={{ span: 6 }} // 标签宽度，通常占较小比例
            wrapperCol={{ span: 20 }} // 控件区域宽度，通常占较大比例
            name="basic"
            initialValues={adminInfo}
            autoComplete="off"
            onFinish={() => submitClick(reset)}
            onValuesChange={(changeValues) => {
                setAdminInfo((pre) => ({
                    ...pre,
                    ...changeValues,
                }));
            }}
            submitter={{
                render: (props) => {
                    return (
                        <Row>
                            <Col span={24} offset={6}>
                                <Space>
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={submitting}
                                        onClick={() => props.form?.submit?.()}
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
                                            disabled={submitting}
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
            {/* 账号 */}
            <ProFormText
                name="username"
                required
                label="管理员账号"
                rules={[{ required: true, message: "请输入管理员账号" }]}
                disabled={type !== "add"}
            />
            {/* 密码 */}
            <ProFormText.Password
                name="password"
                label="密码"
                required
                rules={[{ required: true, message: "请输入密码" }]}
            />
            {/* 名称 */}
            <ProFormText
                name="name"
                label="名称"
                required
                rules={[{ required: true, message: "请输入名称" }]}
            />
            {/* 权限 */}
            <ProFormRadio.Group
                label="权限"
                name="permission"
                options={[
                    { label: "普通管理员", value: 2 },
                    { label: "超级管理员", value: 1 },
                ]}
            />
            {/* 头像 */}
            <ProFormItem
                label="头像"
                name="avatar"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    listType="picture-card"
                    maxCount={1}
                    action="/api/common/avatar"
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: "8px" }}>头像可选</div>
                    </div>
                </Upload>
            </ProFormItem>
        </ProForm>
    );
};

export default AdminForm;
