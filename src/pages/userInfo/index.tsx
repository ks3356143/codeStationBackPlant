import userApi from "@/api/user";
import ModalDescription from "@/components/ModalDescription";
import {
    ActionType,
    PageContainer,
    ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import useUserColumns from "./hooks/useUserColumns";
import { UserType } from "./types";
import useDescColumns from "./hooks/useDescColumns";

// 用户一级页面
const UserInfo = () => {
    const [open, setOpen] = useState(false); // ModalDescription显隐
    const [userInfo, setUserInfo] = useState<UserType | null>(null); // ModalDescription数据
    const actionRef = useRef<ActionType>(null);
    const { columns } = useUserColumns(actionRef, setOpen, setUserInfo);
    const descColumns = useDescColumns()
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
            <ModalDescription
                open={open}
                onClose={() => setOpen(false)}
                info={userInfo}
                descColumns={descColumns}
            />
        </div>
    );
};

export default UserInfo;
