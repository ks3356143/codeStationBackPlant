import typeApi from "@/api/type";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { RefObject, useTransition } from "react";
import { toast } from "react-toastify";

export default function (actionRef: RefObject<any>) {
    const [isPending, startTransition] = useTransition();
    const deleteHandle = (row: any) => {
        startTransition(async () => {
            try {
                await typeApi.delete(row.id);
                toast.success("删除成功!");
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
            title: "分类名称",
            align: "center",
            dataIndex: "name",
            editable: () => true,
        },
        {
            title: "操作",
            width: 200,
            key: "option",
            valueType: "option",
            fixed: "right",
            align: "center",
            render: (_, row) => {
                return (
                    <div>
                        <Popconfirm
                            title="你确定要删除？"
                            onConfirm={() => deleteHandle(row)}
                            okText="删除"
                            cancelText="取消"
                            okButtonProps={{
                                loading: isPending,
                            }}
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
