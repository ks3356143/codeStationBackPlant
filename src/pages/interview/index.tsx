import interviewApi from "@/api/interview";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import InterviewModalForm, { QuizType } from "./components/InterviewModalForm";
import useInterviewColumns from "./hooks/useInterviewColumns";

// 考试题管理一级页面
const Interview = () => {
    const actionRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"add" | undefined>("add");
    // 储存当前编辑行数据
    const [quizInfo, setQuizInfo] = useState<QuizType>({
        quizTitle: "",
        quizContent: "",
        type_id: "",
    });
    const { columns } = useInterviewColumns(
        actionRef,
        setModalOpen,
        setModalType,
        setQuizInfo
    );
    // 给子组件刷新的函数
    const reloadTable = () => {
        actionRef.current && actionRef.current.reload();
    };
    return (
        <PageContainer>
            <ProTable
                toolbar={{
                    menu: {
                        type: "inline",
                        items: [
                            {
                                key: "add",
                                label: (
                                    <Button
                                        type="primary"
                                        icon="+"
                                        onClick={() => {
                                            setModalOpen(true);
                                            setModalType("add");
                                        }}
                                    >
                                        新增数据
                                    </Button>
                                ),
                            },
                        ],
                    },
                }}
                headerTitle="面试题列表"
                actionRef={actionRef}
                columns={columns}
                pagination={{
                    pageSize: 10,
                }}
                rowKey="id"
                request={async (params) => {
                    const { current, pageSize, ...rest } = params;
                    const res = await interviewApi.getInterviews({
                        page: current,
                        page_size: pageSize,
                        ...rest,
                    });
                    return {
                        data: res.data.results,
                        success: res.success,
                        total: res.data.count,
                    };
                }}
            ></ProTable>
            <InterviewModalForm
                type={modalType}
                open={modalOpen}
                setOpen={setModalOpen}
                fatherReload={reloadTable}
                quizInfo={quizInfo}
            ></InterviewModalForm>
        </PageContainer>
    );
};

export default Interview;
