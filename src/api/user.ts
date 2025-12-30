import { UserType } from "@/pages/userInfo/types";
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
    /**
     * 新增用户
     */
    addUser(data: UserType) {
        return request("/api/user/add/", {
            method: "post",
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 修改用户
     */
    updateUser(id: string, data: any) {
        return request(`/api/user/user/${id}`, {
            method: "patch",
            data,
        });
    },
};
