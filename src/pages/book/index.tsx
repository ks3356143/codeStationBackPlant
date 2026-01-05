import bookApi from "@/api/book";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { ActionType } from "@ant-design/pro-table";
import { useRef } from "react";
import useBookColumns from "./hooks/useBookColumns";

// 书籍管理一级页面
const Book = () => {
    const actionRef = useRef<ActionType>(null);
    const columns = useBookColumns(actionRef);
    return (
        <div>
            <PageContainer>
                <ProTable
                    headerTitle="书籍列表"
                    actionRef={actionRef}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                    }}
                    rowKey="id"
                    request={async (params) => {
                        const { current, pageSize, ...rest } = params;
                        const res = await bookApi.getBooks({
                            page: current,
                            page_size: pageSize,
                            type: rest.type ? rest.type : "all",
                            searchValue: rest.title ? rest.title : "",
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

export default Book;
