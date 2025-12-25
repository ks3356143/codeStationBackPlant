// 引入api
import AdminApi from "@/api/admin";
import { message } from "antd";
import { toast } from "react-toastify";
// dva配置
export default {
    // 命名空间
    namespace: "admin",
    // 仓库数据
    state: {
        adminList: [], // 储存所有管理员信息
    },
    // 同步更新仓库状态数据
    reducers: {
        // 1.初始化管理员列表
        initAdminList(state, { payload }) {
            const newState = { ...state };
            newState.adminList = payload;
            return newState;
        },
    },
    // 处理异步副作用
    effects: {
        // 1.初始化管理员列表
        *_initAdminList(_, { call, put }) {
            // 和服务器进行通信，拿到所有数据
            try {
                const { data } = yield call(AdminApi.get_all_admin);
                // 调用reducer更新本地仓库
                yield put({
                    type: "initAdminList",
                    payload: data,
                });
            } catch (e) {
                console.log("请求出现错误：", e);
            }
        },
        // 2.删除一个管理员
        *_deleteAdmin({ payload }, { call, put }) {
            try {
                yield call(AdminApi.delete_admin, payload.id);
                yield put({
                    type: "_initAdminList",
                });
                toast.success("删除管理员成功!")
            } catch (e) {
                const errorResData = e.response.data
                toast.error(errorResData.errorMessage)
            }
        },
    },
};
