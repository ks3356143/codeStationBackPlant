export const normFile = (e: any) => {
    // 处理 Upload 组件的 onChange 事件参数，返回文件列表
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
