import interviewApi from "@/api/interview";
import useSelectFunc from "@/pages/book/hooks/useSelectFunc";
import tool from "@/utils/tool";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { Dispatch, RefObject, SetStateAction, useTransition } from "react";
import { toast } from "react-toastify";
import type { QuizType } from "../components/InterviewModalForm";

export default function (
    actionRef: RefObject<ActionType>,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setModalType: Dispatch<SetStateAction<"add">>,
    setQuizInfo: Dispatch<SetStateAction<QuizType>>
) {
    const fetchTypeOptions = useSelectFunc();
    const [isPending, startTransition] = useTransition();
    // 编辑函数
    const handleEdit = (record: any) => {
        setModalType(undefined);
        setModalOpen(true);
        setQuizInfo({ ...record, type_id: record.type?.id });
    };
    // 删除函数
    const handleDelete = (record: any) => {
        startTransition(async () => {
            try {
                await interviewApi.deleteInterview(record.id);
                toast.success("删除成功!");
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
            title: "题目名称",
            align: "center",
            dataIndex: "quizTitle",
            ellipsis: true,
        },
        {
            title: "题目分类",
            align: "center",
            dataIndex: "type",
            valueType: "select",
            width: 150,
            render: (_, record) => {
                return <Tag color="blue">{record?.type?.name || "--"}</Tag>;
            },
            // 远程获取数据，注意只能是select
            request: fetchTypeOptions,
        },
        {
            title: "上架日期",
            align: "center",
            dataIndex: "create_date",
            search: false,
            width: 250,
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
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => handleDelete(record)}
                            okButtonProps={{ loading: false }}
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
