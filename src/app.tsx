import {
    AvatarDropdown,
    AvatarName,
    Footer,
    Question,
    SelectLang,
} from "@/components";
import { LinkOutlined } from "@ant-design/icons";
import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import { SettingDrawer } from "@ant-design/pro-components";
import "@ant-design/v5-patch-for-react-19";
import type { RequestConfig, RunTimeLayoutConfig } from "@umijs/max";
import { history } from "@umijs/max";
import defaultSettings from "../config/defaultSettings";
import logo from "./assets/logo.png";
import { errorConfig } from "./requestErrorConfig";

const isDev = process.env.NODE_ENV === "development";
const isDevOrTest = isDev || process.env.CI;
const loginPath = "/user/login";

// 导入toastify-react
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: any; // API.CurrentUser
    loading?: boolean;
    fetchUserInfo?: () => Promise<any | undefined>; // API.CurrentUser
}> {
    const fetchUserInfo = async () => {
        return {
            name: "访客",
            avatar: "/src/assets/logo.png",
        };
    };
    // 如果不是登录页面，执行
    const { location } = history;
    if (
        ![loginPath, "/user/register", "/user/register-result"].includes(
            location.pathname
        )
    ) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings as Partial<LayoutSettings>,
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
    };
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
            src: initialState?.currentUser?.avatar,
            title: <AvatarName />,
            render: (_, avatarChildren) => (
                <AvatarDropdown>{avatarChildren}</AvatarDropdown>
            ),
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
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
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
    baseURL: isDev ? "/" : "http://localhost:8000",
    ...errorConfig,
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
