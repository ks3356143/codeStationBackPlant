import issueApi from "@/api/issue";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
import useIssueColumns from "./hooks/useIssueColumns";

// 问答一级页面
const Issue = () => {
    const actionRef = useRef<ActionType>(null);
    const {columns} = useIssueColumns(actionRef)
    return (
        <PageContainer>
            <ProTable
                headerTitle="问题列表"
                actionRef={actionRef}
                rowKey={(row) => row.id}
                columns={columns}
                pagination={{ pageSize: 10 }}
                request={async (params) => {
                    const { current, pageSize, ...rest } = params;
                    const res = await issueApi.getPageIssue({
                        page: current,
                        page_size: pageSize,
                        type: rest.type ? rest.type : "all",
                        enabled: rest.enabled ? rest.enabled : "all",
                    });
                    return {
                        data: res.data.results,
                        success: res.success,
                        total: res.data.count,
                    };
                }}
            ></ProTable>
        </PageContainer>
    );
};

export default Issue;
