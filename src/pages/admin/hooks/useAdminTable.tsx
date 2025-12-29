/**
 * 主要切换enabled和表格的columns设置
 */
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Switch, Tag } from "antd";
import useDeleteUserOrAdmin from "./useDeleteUserOrAdmin";
import useStatuColumn from "./useStatuColumn";

export default function useAdminTable(handleEdit: Function) {
    const { dispatch, toggleLoading, handleToggleSwitch } = useStatuColumn();
    const { confirmClick } = useDeleteUserOrAdmin();
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
                        height={100}
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
            render: (permission: number) => {
                return permission === 1 ? (
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

    // hook输出
    return { columns, dispatch };
}
