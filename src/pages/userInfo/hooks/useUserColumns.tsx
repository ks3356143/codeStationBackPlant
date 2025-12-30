import useDeleteUserOrAdmin from "@/pages/admin/hooks/useDeleteUserOrAdmin";
import useStatuColumn from "@/pages/admin/hooks/useStatuColumn";
import type { DataType } from "@/pages/admin/types";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { Avatar, Button, Popconfirm, Switch } from "antd";

export default function (
    actionRef?: any,
    setOpen: (open: boolean) => void = () => {},
    setUserInfo: (userInfo: any) => void = () => {}
) {
    const { toggleLoading, handleToggleSwitch } = useStatuColumn(actionRef);
    const { confirmClick } = useDeleteUserOrAdmin();
    const navigate = useNavigate();
    const columns: ProColumns<DataType>[] = [
        {
            title: "序号",
            align: "center",
            width: 50,
            dataIndex: "index",
            valueType: "indexBorder",
        },
        {
            title: "登录账户",
            dataIndex: "username",
            align: "center",
        },
        {
            title: "密码",
            dataIndex: "password",
            align: "center",
            width: 180,
            search: false,
            ellipsis: true,
        },
        {
            title: "昵称",
            dataIndex: "name",
            align: "center",
        },
        {
            title: "头像",
            dataIndex: "avatar",
            align: "center",
            search: false,
            render: (imgUrl) => {
                const complete_url = API_URL + imgUrl;
                return <Avatar src={complete_url} />;
            },
        },
        {
            title: "账号状态",
            align: "center",
            key: "enabled",
            dataIndex: "enabled",
            search: false,
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
            valueType: "option",
            key: "option",
            align: "center",
            fixed: "right",
            width: 200,
            render: (_, record, __, action) => {
                return (
                    <div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                setUserInfo(record);
                                setOpen(true);
                            }}
                        >
                            详情
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() =>
                                navigate(`/userInfo/editUser/${record.id}`, {
                                    state: record,
                                })
                            }
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            title="确定删除该管理员?"
                            onConfirm={() => confirmClick(record)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button danger size="small" type="link">
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    return { columns };
}
