import issueApi from "@/api/issue";
import typeApi from "@/api/type";
import {
    PageContainer,
    ProForm,
    ProFormText,
    ProTable,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import useTypeColumns from "./hooks/useTypeColumns";

// 类型一级页面
const Type = () => {
    const actionRef = useRef(null);
    const formRef = useRef(null);
    const currentTypes = useRef([]);
    const { columns } = useTypeColumns(actionRef);
    const [isPending, startTransition] = useTransition();
    const handleFinish = async (formValue: any) => {
        startTransition(async () => {
            try {
                const name = formValue.name;
                // 判断是否重复
                const isExit = currentTypes.current
                    .map((it: any) => it.name)
                    .includes(name);
                if (isExit) {
                    toast.error("类型名称重复请检查!");
                    return;
                }
                await typeApi.addOne(name);
                toast.success("新增成功!");
                actionRef.current && actionRef.current.reload();
                // 注意清空输入框
                formRef.current && formRef.current.resetFields();
            } catch (e) {
                toast.error("新增失败");
            }
        });
    };
    return (
        <PageContainer>
            <div
                style={{
                    width: 500,
                    height: 28,
                    margin: 10,
                    marginBottom: 30,
                }}
            >
                <ProForm
                    layout="inline"
                    onFinish={handleFinish}
                    loading={isPending}
                    formRef={formRef}
                    submitter={{
                        render: (props) => [
                            <div key="buttons" style={{ display: "block" }}>
                                {/* 关键修改处 */}
                                <Button
                                    onClick={() => props.form?.resetFields()}
                                    style={{ marginRight: 8 }}
                                >
                                    重置
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => props.form?.submit()}
                                >
                                    新增
                                </Button>
                            </div>,
                        ],
                    }}
                >
                    <ProFormText
                        name="name"
                        placeholder="填写新增类型"
                        label="类型"
                        initialValue=""
                        rules={[{ required: true, message: "请填写类型名称，不能为空!" }]}
                    ></ProFormText>
                </ProForm>
            </div>
            <ProTable
                headerTitle="分类信息"
                columns={columns}
                actionRef={actionRef}
                rowKey={(row) => row.id}
                search={false}
                pagination={{
                    pageSize: 5,
                }}
                request={async () => {
                    const res = await issueApi.getAllType();
                    currentTypes.current = res.data;
                    return {
                        data: res.data,
                        success: res.success,
                        total: res.data.length,
                    };
                }}
            />
        </PageContainer>
    );
};

export default Type;
