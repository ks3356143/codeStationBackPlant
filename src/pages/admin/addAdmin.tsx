import adminApi from "@/api/admin";
import { PageContainer } from "@ant-design/pro-components";
import { useDispatch, useNavigate } from "@umijs/max";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import styles from "./addAdmin.less";
import AdminForm from "./components/AdminForm";
import { DataType } from "./types";

const AddAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initAdminInfo = {
        id: "",
        password: "",
        username: "",
        name: "",
        avatar: [],
        permission: 2,
    };
    const [newAdminInfo, setNewAdminInfo] = useState<DataType>({
        ...initAdminInfo,
    });
    // useTransition异步处理
    const [isPending, startTransition] = useTransition();

    // 用户点击表单确认按钮
    const submitClick = async (reset: () => void) => {
        // 新增操作-没有id
        startTransition(async () => {
            try {
                // 对avatar进行处理
                const commitData = {
                    ...newAdminInfo,
                    avatar:
                        newAdminInfo.avatar!.length > 0
                            ? newAdminInfo.avatar![0].response.data
                            : "",
                };
                await adminApi.add_admin(commitData);
                toast.success("新增管理员成功");
                // 处理loading和清除表单工作
                dispatch({
                    type: "admin/_initAdminList",
                });
                reset();
                // 跳转页面
                navigate("/admin/adminList");
            } catch (e: any) {
                const errorData = e.response.data;
                toast.error(errorData.errorMessage);
            }
        });
    };

    return (
        <PageContainer>
            <div className={styles.container}>
                <AdminForm
                    type="add"
                    adminInfo={initAdminInfo}
                    setAdminInfo={setNewAdminInfo}
                    submitClick={submitClick}
                    submitting={isPending}
                ></AdminForm>
            </div>
        </PageContainer>
    );
};

export default AddAdmin;
