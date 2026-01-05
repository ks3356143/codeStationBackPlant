import interviewApi from "@/api/interview";
import ToastUIEditorField from "@/pages/book/components/ToastUIEditor";
import useSelectFunc from "@/pages/book/hooks/useSelectFunc";
import {
    ModalForm,
    ProForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { FormRef } from "rc-field-form";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";

// 新建和编辑表单数据类型
export interface QuizType {
    id?: string;
    quizTitle: string;
    quizContent: string;
    type_id: string;
}

type Props = {
    type?: "add";
    open: boolean;
    setOpen: (open: boolean) => void;
    fatherReload?: () => void;
    quizInfo: QuizType;
};

const InterviewModalForm = ({
    type,
    open,
    setOpen,
    fatherReload,
    quizInfo,
}: Props) => {
    const fetchTypeOptions = useSelectFunc();
    const [isPending, startTransition] = useTransition();
    // refs
    const editorRef = useRef(null);
    const formRef = useRef<FormRef>(null);
    // 根据type初始化表单（新增/编辑）
    const getInitialValue = () => {
        if (type === "add") return {};
        return {
            ...quizInfo,
        };
    };
    // 提交信息
    const handleFinish = async (value: QuizType) => {
        // 提交
        startTransition(async () => {
            try {
                if (type === "add") {
                    await interviewApi.addInterview({ ...value });
                    toast.success("新增成功!");
                } else {
                    await interviewApi.updateInterview(quizInfo.id, { ...value });
                    toast.success("编辑成功!");
                }
                setOpen(false);
                fatherReload(); // 父组件刷新
            } catch (e) {
                toast.error("新增失败，请打开控制台查看信息");
                console.error(e);
            }
        });
    };
    return (
        <div>
            <ModalForm<QuizType>
                title={type === "add" ? "新增面试题" : "编辑面试题"}
                open={open}
                width="70%"
                onOpenChange={setOpen}
                initialValues={getInitialValue()}
                autoFocusFirstInput
                layout="horizontal"
                formRef={formRef}
                loading={isPending}
                modalProps={{
                    destroyOnHidden: true,
                }}
                onFinish={handleFinish}
            >
                <ProFormText
                    name="quizTitle"
                    label="题目标题"
                    rules={[{ required: true, message: "请输入题目标题" }]}
                />
                <ProFormSelect
                    name="type_id"
                    label="题目分类"
                    width="md"
                    placeholder="请选择题目分类"
                    request={fetchTypeOptions}
                    rules={[{ required: true, message: "题目分类必选" }]}
                ></ProFormSelect>
                <ProForm.Item
                    name="quizContent"
                    label="题目解答"
                    rules={[{ required: true, message: "题目解答不能为空" }]}
                >
                    <ToastUIEditorField
                        ref={editorRef}
                        height="400px"
                        width="100%"
                        hooks={{
                            addImageBlobHook: async (blob, callback) => {
                                const formData = new FormData();
                                formData.append("file", blob);
                            },
                        }}
                    />
                </ProForm.Item>
            </ModalForm>
        </div>
    );
};

export default InterviewModalForm;
