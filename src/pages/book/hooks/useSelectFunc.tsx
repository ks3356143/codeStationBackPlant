import issueApi from "@/api/issue";
import { toast } from "react-toastify";

export default function () {
    // 单纯获取一个远程请求的函数
    const fetchTypeOptions = async () => {
        try {
            const res = await issueApi.getAllType();
            return res.data.map((it: any) => ({
                label: it.name,
                value: it.id,
            }));
        } catch {
            toast.error("获取类型列表失败");
        }
        return [];
    };
    return fetchTypeOptions;
}
