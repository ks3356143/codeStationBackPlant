import commentApi from "@/api/comment";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Card, Modal, Radio } from "antd";
import { ReactNode, useRef, useState } from "react";
import useCommentColumns from "./hooks/useCommentColumns";

// 评论管理一级页面
const Comment = () => {
    const actionRef = useRef(null);
    const [commentType, setCommentType] = useState<1 | 2>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const handleModalCancel = () => {
        setIsModalOpen(false);
        setCurrentRecord(null); // 关闭时情况当前记录
    };
    const handleClickDetail = (record: any) => {
        setCurrentRecord(record);
        setIsModalOpen(true);
    };
    const { columns } = useCommentColumns(handleClickDetail,actionRef);
    // 对record进行处理
    const renderRecord: () => ReactNode = () => {
        if (!currentRecord) return null;
        const title =
            currentRecord.book?.title || currentRecord.issue?.issueTitle;
        return (
            <div>
                <h5>标题：{title}</h5>
                <div style={{ margin: "5px 0" }}>评论内容：</div>
                <Card hoverable>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: currentRecord.commentContent,
                        }}
                    ></div>
                </Card>
            </div>
        );
    };
    const onChange = (e: any) => {
        setCommentType(e.target.value);
        actionRef.current.reload(); // 再次刷新请求
    };
    return (
        <>
            <PageContainer>
                {/* 可切换页面 */}
                <Radio.Group
                    onChange={onChange}
                    value={commentType}
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    <Radio.Button value={1} defaultChecked>
                        问答评论
                    </Radio.Button>
                    <Radio.Button value={2}>书籍评论</Radio.Button>
                </Radio.Group>
                <ProTable
                    headerTitle="评论列表"
                    actionRef={actionRef}
                    pagination={{ pageSize: 10 }}
                    columns={columns}
                    rowKey={(row) => row.id}
                    request={async (params) => {
                        const { current, pageSize, ...rest } = params;
                        const res = await commentApi.getComments({
                            page: current,
                            page_size: pageSize,
                            ...rest,
                            commentType: commentType,
                        });
                        return {
                            data: res.data.results,
                            success: res.success,
                            total: res.data.count,
                        };
                    }}
                ></ProTable>
            </PageContainer>
            <Modal
                title="评论详情"
                open={isModalOpen}
                onCancel={handleModalCancel}
                style={{ top: 50 }}
                footer={false}
            >
                {renderRecord()}
            </Modal>
        </>
    );
};

export default Comment;
