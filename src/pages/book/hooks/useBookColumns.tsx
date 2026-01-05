import bookApi from "@/api/book";
import tool from "@/utils/tool";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { Button, Image, Popconfirm, Tag } from "antd";
import { RefObject, useTransition } from "react";
import { toast } from "react-toastify";
import useSelectFunc from "./useSelectFunc";

export default function useBookColumns(actionRef: RefObject<ActionType>) {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const fetchTypeOptions = useSelectFunc();
    const handleDelete = (record: any) => {
        startTransition(async () => {
            try {
                await bookApi.deleteBook(record.id);
                toast.success("删除书籍成功");
                actionRef.current?.reload(); // 重新请求表单
            } catch (e) {
                if (e.response?.status === 502) {
                    toast.success("删除书籍成功");
                    actionRef.current?.reload();
                }
                toast.error("删除失败，异常错误!");
            }
        });
    };
    const handleEdit = (record: any) => {
        navigate(`/book/editBook/${record.id}`, { state: record });
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
            title: "书籍名称",
            align: "center",
            dataIndex: "title",
        },
        {
            title: "书籍分类",
            align: "center",
            dataIndex: "type",
            valueType: "select",
            render: (_, record) => {
                return <Tag color="blue">{record?.type?.name || "--"}</Tag>;
            },
            // 远程获取数据，注意只能是select
            request: fetchTypeOptions,
        },
        {
            title: "书籍介绍",
            align: "center",
            dataIndex: "bookInfo",
            search: false,
            ellipsis: true,
            width: 300,
        },
        {
            title: "书籍封面",
            align: "center",
            dataIndex: "picture",
            search: false,
            render(url) {
                return url === "-" ? (
                    "-"
                ) : (
                    <Image width={80} src={API_URL + url}></Image>
                );
            },
        },
        {
            title: "浏览数",
            align: "center",
            dataIndex: "scanNumber",
            search: false,
            width: 60,
        },
        {
            title: "评论数",
            align: "center",
            dataIndex: "commentNumber",
            search: false,
            width: 60,
        },
        {
            title: "上架日期",
            align: "center",
            dataIndex: "create_date",
            search: false,
            render(iosString: string) {
                return tool.formatDateTimeWithDayjs(iosString);
            },
        },
        {
            title: "操作",
            valueType: "option",
            key: "option",
            align: "center",
            fixed: "right",
            width: 200,
            render: (_, record) => {
                return (
                    <div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleEdit(record)}
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            title="确定删除该管理员?"
                            onConfirm={() => handleDelete(record)}
                            okText="确认"
                            cancelText="取消"
                            okButtonProps={{ loading: isPending }}
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
    return columns;
}
