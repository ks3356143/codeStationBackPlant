import { request } from "@umijs/max";

export default {
    /**
     * 分页获取用户信息
     */
    getPageUsers(params: any) {
        return request("/api/user/get_page_users", {
            method: "get",
            skipErrorHandler: true,
            params: {
                ...params,
            },
        });
    },
};
