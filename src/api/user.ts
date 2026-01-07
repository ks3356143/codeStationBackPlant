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
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 登录
     */
    login(data: { username: string; password: string }) {
        return request("/api/user/pair", {
            method: "post",
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 分页获取用户信息
     */
    getUserInfo() {
        return request("/api/user/get_info", {
            method: "get",
            skipErrorHandler: true,
        });
    },
};
