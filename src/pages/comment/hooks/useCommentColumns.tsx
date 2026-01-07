import commentApi from "@/api/comment";
import useSelectFunc from "@/pages/book/hooks/useSelectFunc";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { RefObject, useTransition } from "react";
import { toast } from "react-toastify";

export default function (
    handleClickDetail: (record: any) => void,
    actionRef: RefObject<any>
) {
    const fetchTypeOptions = useSelectFunc();
    const [isPending, startTransition] = useTransition();
    const handleDelete = async (id: string) => {
        startTransition(async () => {
            try {
                await commentApi.delete(id);
                toast.success("删除成功!");
                actionRef.current && actionRef.current.reload();
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
            title: "标题",
            dataIndex: "commentTitle",
            search: false,
            width: 250,
            ellipsis: true,
            render(_, row) {
                const title = row.book?.title || row.issue?.issueTitle;
                return title;
            },
        },
        {
            title: "评论内容",
            dataIndex: "commentContent",
            width: 250,
            ellipsis: true,
            render(_, row) {
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = row.commentContent;
                return tempDiv.textContent;
            },
        },
        {
            title: "评论用户",
            dataIndex: "user",
            search: false,
            width: 150,
            render(_, row) {
                return (
                    <Tag color="blue" key={row.id}>
                        {row.user.name}
                    </Tag>
                );
            },
        },
        {
            title: "评论分类",
            dataIndex: "type",
            align: "center",
            width: 150,
            valueType: "select", // 只用于搜索表单
            request: fetchTypeOptions, // 只用于搜索表单
            render: (_, row) => {
                const type = row.book?.type || row.issue.type;
                const renderText = type.name ? type.name : type[0];
                return <Tag color="magenta">{renderText || "--"}</Tag>;
            },
        },
        {
            title: "操作",
            width: 150,
            key: "option",
            valueType: "option",
            fixed: "right",
            align: "center",
            render: (_, row) => {
                return (
                    <div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                handleClickDetail(row);
                            }}
                        >
                            详情
                        </Button>
                        <Popconfirm
                            title="是否要删除该条评论？"
                            onConfirm={() => {
                                handleDelete(row.id);
                            }}
                            okText="删除"
                            cancelText="取消"
                        >
                            <Button danger type="link" size="small">
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
