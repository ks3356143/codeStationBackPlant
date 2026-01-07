import { request } from "@umijs/max";

export default {
    /**
     * 分页查询所有评论
     */
    getComments(
        params: {
            page: number;
            page_size: number;
            commentType: 1 | 2;
        } = {
            page: 1,
            page_size: 10,
            commentType: 1,
        }
    ) {
        return request("/api/comment/book_list/", {
            method: "get",
            skipErrorHandler: true,
            params,
        });
    },
    /**
     * 删除评论
     */
    delete(id: string) {
        return request(`/api/comment/${id}`, {
            method: "delete",
            skipErrorHandler: true,
        });
    },
};
