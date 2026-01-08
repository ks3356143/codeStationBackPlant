import {
    AvatarDropdown,
    AvatarName,
    Footer,
    Question,
    SelectLang,
} from "@/components";
import { LinkOutlined } from "@ant-design/icons";
import { SettingDrawer } from "@ant-design/pro-components";
import "@ant-design/v5-patch-for-react-19";
import type { RequestConfig, RunTimeLayoutConfig } from "@umijs/max";
import { history } from "@umijs/max";
import logo from "./assets/logo.png";
import { errorConfig } from "./requestErrorConfig";

const isDev = process.env.NODE_ENV === "development";
const isDevOrTest = isDev || process.env.CI;
const loginPath = "/login";

// 导入toastify-react
import userApi from "@/api/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<any> {
    const token = localStorage.getItem("adminToken");
    if (location.pathname === "/login") {
        // 说明直接请求的登录页面，这要判断token是否有限，有效则跳转首页，无效停留
        if (token) {
            const res = await userApi.getUserInfo();
            if (res.success) {
                location.href = "/";
                return {
                    currentUser: { ...res.data },
                };
            } else {
                return {
                    currentUser: undefined,
                };
            }
        }
    } else {
        // 说明强行跳转内部页面
        const res = await userApi.getUserInfo();
        if (res.success) {
            // 说明有token并且请求到用户信息了
            const userInfo = res.data;
            return {
                currentUser: { ...userInfo },
            };
        } else {
            localStorage.removeItem("adminToken");
            location.href = "/login";
            toast.error("登录过期，请重新登录");
            return {
                currentUser: undefined,
            };
        }
    }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
    initialState,
    setInitialState,
}) => {
    return {
        actionsRender: () => [
            <Question key="doc" />,
            <SelectLang key="SelectLang" />,
        ],
        avatarProps: {
            src: API_URL + initialState?.currentUser?.avatar,
            title: <AvatarName />,
            render: (_, avatarChildren) => (
                <AvatarDropdown>{avatarChildren}</AvatarDropdown>
            ),
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果访问的不是登录页，且没有用户信息
            if (
                !initialState?.currentUser?.id &&
                location.pathname !== loginPath
            ) {
                history.push(loginPath);
            }
        },
        bgLayoutImgList: [
            {
                src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
                left: 85,
                bottom: 100,
                height: "303px",
            },
            {
                src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
                bottom: -68,
                right: -45,
                height: "303px",
            },
            {
                src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
                bottom: 0,
                left: 0,
                size: "331px",
            },
        ],
        links: isDevOrTest
            ? [
                  <a
                      key="openapi"
                      href="http://127.0.0.1:8000/api/docs"
                      target="_blank"
                  >
                      <LinkOutlined />
                      <span>OpenAPI列表</span>
                  </a>,
              ]
            : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children) => {
            // if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                    {isDevOrTest && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={(settings) => {
                                setInitialState((preInitialState) => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
        ...initialState?.settings,
        logo: logo,
        layout: "mix",
    };
};

// 自定义拦截器
// 拦截器s
const authHeaderInterceptor = (url: string, options: RequestConfig) => {
    const token = localStorage.getItem("adminToken");
    const authHeader = { Authorization: `Bearer ${token}` };
    return {
        url: `${url}`,
        options: { ...options, interceptors: true, headers: authHeader },
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
    baseURL: isDev ? "/" : "http://47.108.230.220:8082",
    ...errorConfig,
    requestInterceptors: [authHeaderInterceptor],
};

// 自定义App组件
export const rootContainer = (container: React.ReactNode) => {
    return (
        <>
            {/* 将 ToastContainer 置于最外层 */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {container}
        </>
    );
};
