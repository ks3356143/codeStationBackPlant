import { request } from "@umijs/max";

export default {
    /**
     * 查询所有类型
     */
    getAllType() {
        return request("/api/type/", {
            method: "get",
            skipErrorHandler: true,
        });
    },
    /**
     * 分页查询问答
     */
    getPageIssue(
        params: {
            page?: number;
            page_size?: number;
            type?: string | "all";
            enabled?: boolean | "all";
            issueTitle?: string;
        } = {
            page: 1,
            page_size: 10,
            type: "all",
            enabled: "all",
            issueTitle: "",
        }
    ) {
        return request("/api/issue", {
            method: "get",
            skipErrorHandler: true,
            params,
        });
    },
    /**
     * 分页查询问答
     */
    switchStatus(params: { status: boolean; id: string }) {
        return request("/api/issue/change_status/", {
            method: "get",
            skipErrorHandler: true,
            params,
        });
    },
    /**
     * 删除问答以及评论
     */
    delete(id: string) {
        return request(`/api/issue/${id}`, {
            method: "delete",
            skipErrorHandler: true,
        });
    },
};
