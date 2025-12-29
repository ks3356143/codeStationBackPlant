import { change_enabled } from "@/services/user/api";
import { useDispatch } from "@umijs/max";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function (actionRef?: any) {
    const dispatch = useDispatch();
    const [toggleLoading, setToggleLoading] = useState(false);
    // 设置点击enabled后形式
    const handleToggleSwitch = useCallback(
        async (record: any) => {
            setToggleLoading(true);
            try {
                await change_enabled(record.id, !record.enabled);
                dispatch({
                    type: "admin/_initAdminList",
                });
                if (actionRef.current) {
                    actionRef.current.reload();
                }
                setToggleLoading(false);
            } catch (e: any) {
                toast.error(e.response.data.errorMessage);
                setToggleLoading(false);
            } finally {
                setToggleLoading(false);
            }
        },
        [dispatch]
    );
    return { dispatch, toggleLoading, handleToggleSwitch };
}
