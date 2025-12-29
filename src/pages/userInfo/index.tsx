import userApi from "@/api/user";
import {
    ActionType,
    PageContainer,
    ProTable,
} from "@ant-design/pro-components";
import { useRef } from "react";
import useUserColumns from "./hooks/useUserColumns";

// 用户一级页面
const UserInfo = () => {
    const actionRef = useRef<ActionType>(null);
    const { columns } = useUserColumns(actionRef);
    return (
        <div>
            <PageContainer>
                <ProTable
                    headerTitle="用户列表"
                    rowKey="id"
                    actionRef={actionRef}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                    }}
                    request={async (params: {
                        current: number;
                        pageSize: number;
                    }) => {
                        // 注意带查询参数
                        const { current, pageSize, ...rest } = params;
                        const res = await userApi.getPageUsers({
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
            </PageContainer>
        </div>
    );
};

export default UserInfo;
