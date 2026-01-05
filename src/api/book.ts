import { request } from "@umijs/max";

export default {
    /**
     * 分页查询所有book
     */
    getBooks(
        params: {
            page: number;
            page_size: number;
            type: string;
            searchValue: string;
        } = {
            page: 1,
            page_size: 10,
            type: "all",
            searchValue: "",
        }
    ) {
        return request("/api/book/getBooksByContent/", {
            method: "get",
            skipErrorHandler: true,
            params,
        });
    },
    /**
     * 新增书籍
     */
    addBook(data = {}) {
        return request("/api/book/", {
            method: "post",
            skipErrorHandler: true,
            data,
        });
    },
    /**
     * 删除书籍
     */
    deleteBook(id: number) {
        return request(`/api/book/${id}`, {
            method: "delete",
            skipErrorHandler: true,
        });
    },
    /**
     * 更新书籍
     */
    updateBook(id: number, data: {}) {
        return request(`/api/book/update_book/${id}`, {
            method: "put",
            skipErrorHandler: true,
            data,
        });
    },
};
