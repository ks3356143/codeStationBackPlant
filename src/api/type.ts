import { request } from "@umijs/max";

export default {
    /**
     * 新增一个类型
     */
    addOne(name: string) {
        return request("/api/type/", {
            method: "post",
            skipErrorHandler: true,
            data: {
                name,
            },
        });
    },
    /**
     * 删除一个类型
     */
    delete(id: string) {
        return request(`/api/type/${id}`, {
            method: "delete",
            skipErrorHandler: true,
        });
    },
};
