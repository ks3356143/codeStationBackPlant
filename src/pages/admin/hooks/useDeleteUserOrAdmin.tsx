import { useDispatch } from "@umijs/max";

export default function () {
    const dispatch = useDispatch();
    const confirmClick = async (record: any) => {
        dispatch({
            type: "admin/_deleteAdmin",
            payload: record,
        });
        // 需要判定是否为当前账户?是的话则提示无法删除
    };
    return { confirmClick };
}
