import tool from "@/utils/tool";
import { RollbackOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { useLocation, useNavigate } from "@umijs/max";
import { Card, FloatButton, Space, Tag } from "antd";
import styles from "./detail.module.less";
import type { LocationState } from "./types";

const IssueDetail = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const navigate = useNavigate();
    return (
        <PageContainer>
            <FloatButton
                shape="square"
                tooltip="返回问题列表"
                onClick={() => navigate("/issue")}
                icon={<RollbackOutlined />}
                type="primary"
            />
            <div
                className="container"
                style={{
                    width: "100%",
                    margin: "auto",
                }}
            >
                <Card
                    title={state.issueTitle}
                    variant="borderless"
                    style={{
                        marginTop: 20,
                    }}
                    extra={
                        <Tag color="purple" key={state.id}>
                            {state.type}
                        </Tag>
                    }
                >
                    <Card className={styles.flex}>
                        <Space direction="vertical" className={styles.topCard}>
                            <Tag color="volcano" key={state.user.id}>
                                {state.user.name}
                            </Tag>
                            <div>账号:{state.user.username}</div>
                        </Space>
                        <Space direction="vertical" className={styles.topCard}>
                            <div>发布于：</div>
                            <div>
                                {tool.formatDateTimeWithDayjs(
                                    state.create_date
                                )}
                            </div>
                        </Space>
                        <Space direction="vertical" className={styles.topCard}>
                            <div>更新于：</div>
                            <div>
                                {tool.formatDateTimeWithDayjs(
                                    state.update_date
                                )}
                            </div>
                        </Space>
                        <Space direction="vertical" className={styles.topCard}>
                            <div>浏览</div>
                            <div className={styles.center}>
                                {state.scanNumber}
                            </div>
                        </Space>
                        <Space
                            direction="vertical"
                            className={styles.topCardLast}
                        >
                            <div>评论</div>
                            <div className={styles.center}>
                                {state.commentNumber}
                            </div>
                        </Space>
                    </Card>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: state.issueContent,
                        }}
                        style={{ padding: "10px" }}
                    ></div>
                </Card>
            </div>
        </PageContainer>
    );
};

export default IssueDetail;
