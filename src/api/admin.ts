import { request } from "@umijs/max";

/**
 * 获取所有管理员
 */
function get_all_admin() {
    return request("/api/user/admin", {
        method: "get",
        skipErrorHandler: true,
    });
}

/** 删除管理员 POST */
function delete_admin(admin_id: string) {
    return request(`/api/user/admin_delete/${admin_id}`, {
        method: "delete",
        skipErrorHandler: true,
    });
}

/** 修改管理员 PATCH */
function modify_admin(id: string, data: any) {
    return request(`/api/user/admin/${id}`, {
        method: "patch",
        data,
    });
}

/** 新增管理员 POST */
function add_admin(data: any) {
    return request(`/api/user/admin/add/`, {
        method: "post",
        skipErrorHandler: true, // 不要报出默认错误
        data,
    });
}

export default {
    get_all_admin,
    delete_admin,
    modify_admin,
    add_admin,
};
