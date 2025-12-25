/**
 * 主要切换enabled和表格的columns设置
 */
import { change_enabled } from "@/services/user/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "@umijs/max";
import { Button, Image, message, Popconfirm, Space, Switch, Tag } from "antd";
import { useCallback, useState } from "react";

export default function useAdminTable(handleEdit: Function) {
    const dispatch = useDispatch();
    const [toggleLoading, setToggleLoading] = useState(false);
    // 设置点击enabled后形式
    const handleToggleSwitch = useCallback(
        async (record: any) => {
            setToggleLoading(true);
            try {
                await change_enabled(record.id, !record.enabled);
                dispatch({
                    type: "admin/_initAdminList",
                });
                setToggleLoading(false);
            } catch (e) {
                message.error("切换失败");
                setToggleLoading(false);
            } finally {
                setToggleLoading(false);
            }
        },
        [dispatch]
    );
    // 设置PopConfirm内容

    const columns: any = [
        {
            title: "登录账号",
            align: "center",
            key: "username",
            dataIndex: "username",
        },
        {
            title: "登录密码",
            align: "center",
            key: "password",
            dataIndex: "password",
            ellipsis: true,
        },
        {
            title: "昵称",
            align: "center",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "头像",
            align: "center",
            key: "avatar",
            width: "100px",
            dataIndex: "avatar",
            render: (url: string) => {
                if (url === "-") {
                    url = "";
                }
                const defaultAvatar =
                    "http://localhost:8000/media/user_avatar/default_avatar.png";
                const imgSrc = url
                    ? `http://localhost:8000/${url}`
                    : defaultAvatar;
                return (
                    <Image
                        alt="头像"
                        src={imgSrc}
                        fallback={defaultAvatar}
                    ></Image>
                );
            },
        },
        {
            title: "权限",
            align: "center",
            key: "permission",
            dataIndex: "permission",
            render: (permission: boolean) => {
                return permission ? (
                    <Tag color="volcano">超级管理员</Tag>
                ) : (
                    <Tag color="blue">普通管理员</Tag>
                );
            },
        },
        {
            title: "账号状态",
            align: "center",
            key: "enabled",
            dataIndex: "enabled",
            render: (_: any, record: any) => {
                return (
                    <Switch
                        loading={toggleLoading}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={record.enabled}
                        onChange={() => handleToggleSwitch(record)}
                    />
                );
            },
        },
        {
            title: "操作",
            align: "center",
            key: "option",
            render: (_: any, record: any) => {
                return (
                    <Space key={record.id}>
                        <Button
                            type="primary"
                            ghost
                            size="small"
                            onClick={() => handleEdit(record)}
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            title="确定删除该管理员?"
                            onConfirm={() => confirmClick(record)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button danger size="small">
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const confirmClick = async (record: any) => {
        dispatch({
            type: "admin/_deleteAdmin",
            payload: record,
        });
        // 需要判定是否为当前账户?是的话则提示无法删除
    };

    // hook输出
    return { columns, dispatch };
}
