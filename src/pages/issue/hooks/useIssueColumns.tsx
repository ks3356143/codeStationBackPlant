import issueApi from "@/api/issue";
import useSelectFunc from "@/pages/book/hooks/useSelectFunc";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { Button, Popconfirm, Switch, Tag } from "antd";
import { RefObject, useTransition } from "react";
import { toast } from "react-toastify";

export default function (actionRef: RefObject<ActionType>) {
    const fetchTypeOptions = useSelectFunc();
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    // 切换status
    const switchStatus = async (checked: boolean, issueId: string) => {
        startTransition(async () => {
            try {
                await issueApi.switchStatus({ status: checked, id: issueId });
                toast.success("切换成功,问题审核通过!");
                actionRef.current.reload();
            } catch (e) {
                toast.error("切换失败");
            }
        });
    };
    // 删除问答
    const handleDelete = (row: any) => {
        startTransition(async () => {
            try {
                await issueApi.delete(row.id);
                toast.success("删除成功，关联评论也删除了!");
                actionRef.current.reload();
            } catch (e) {
                if (e.response?.status === 502) {
                    toast.success("删除成功");
                    actionRef.current?.reload();
                } else {
                    toast.error("删除失败，请打开控制台查看");
                    console.log(e);
                }
            }
        });
    };
    const columns: ProColumns<any>[] = [
        {
            title: "序号",
            align: "center",
            width: 50,
            dataIndex: "index",
            valueType: "indexBorder",
        },
        {
            title: "问答标题",
            dataIndex: "issueTitle",
            ellipsis: true,
            width: 200,
        },
        {
            title: "问答描述",
            dataIndex: "issueContent",
            search: false,
            render: (_, row) => {
                let reg = /<[^<>]+>/g;
                let brief = row.issueContent;
                brief = brief.replace(reg, "");
                if (brief.length > 150) {
                    brief = brief.slice(0, 150) + "...";
                }
                return [brief];
            },
        },
        {
            title: "浏览数",
            dataIndex: "scanNumber",
            align: "center",
            search: false,
            width: 80,
        },
        {
            title: "评论数",
            dataIndex: "commentNumber",
            align: "center",
            search: false,
            width: 80,
        },
        {
            title: "问题分类",
            dataIndex: "type",
            align: "center",
            width: 250,
            valueType: "select", // 只用于搜索表单
            request: fetchTypeOptions, // 只用于搜索表单
            render: (_, record) => {
                return <Tag color="blue">{record?.type[0] || "--"}</Tag>;
            },
        },
        {
            title: "审核状态",
            dataIndex: "status",
            align: "center",
            width: 100,
            render(_, record) {
                const defaultChecked = record.status;
                return (
                    <Switch
                        key={record.id}
                        value={defaultChecked}
                        loading={isPending}
                        size="small"
                        checkedChildren="启动"
                        unCheckedChildren="关闭"
                        onClick={(checked) => switchStatus(checked, record.id)}
                    ></Switch>
                );
            },
        },
        {
            title: "操作",
            width: 150,
            valueType: "option",
            align: "center",
            render: (_, row) => {
                return (
                    <>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => navigate(`/issue/${row.id}`)}
                        >
                            详情
                        </Button>
                        <Popconfirm
                            title="评论也会删除？"
                            onConfirm={() => handleDelete(row)}
                            okText="删除"
                            cancelText="取消"
                        >
                            <Button type="link" size="small" danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    return { columns };
}
