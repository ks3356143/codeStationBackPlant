import { request } from "@umijs/max";

/** 登录接口 POST /api/login/account */
export async function login(body: any, options?: { [key: string]: any }) {
    return request<any>("/api/login/pair", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

/** 切换用户 GET */
export async function change_enabled(admin_id: string, enabled: boolean) {
    return request<any>("/api/user/admin_enabled_change", {
        method: "get",
        params: {
            admin_id,
            enabled,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
}
