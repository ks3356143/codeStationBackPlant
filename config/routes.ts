/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
    {
        path: "/",
        redirect: "/home",
        access: 'NormalAdmin',
    },
    {
        path: "/home",
        name: "首页",
        icon: "home",
        component: "./home",
        access: 'NormalAdmin',
    },
    {
        path: "/login",
        component: "./Login",
        menuRender: false,
    },
    {
        path: "/admin",
        name: "管理员",
        hideInBreadcrumb: true,
        access: 'SuperAdmin',
        icon: "user",
        routes: [
            {
                path: "adminList",
                name: "管理员列表",
                component: "./admin",
                access: 'SuperAdmin',
            },
            {
                path: "addAdmin",
                name: "添加管理员",
                component: "./admin/addAdmin",
                access: 'SuperAdmin',
            },
        ],
    },
    {
        path: "/userInfo",
        name: "用户",
        icon: "team",
        access: 'NormalAdmin',
        hideInBreadcrumb: true,
        routes: [
            {
                path: "userList",
                name: "用户列表",
                component: "./userInfo",
                access: 'NormalAdmin',
            },
            {
                path: "addUser",
                name: "添加用户",
                component: "./userInfo/addUser",
                access: 'NormalAdmin',
            },
            {
                path: "editUser/:id",
                name: "编辑用户",
                component: "./userInfo/editUser",
                hideInMenu: true,
                access: 'NormalAdmin',
            },
        ],
    },
    {
        path: "/book",
        name: "书籍",
        icon: "read",
        hideInBreadcrumb: true,
        access: 'NormalAdmin',
        routes: [
            {
                path: "bookList",
                name: "书籍列表",
                component: "./book",
                access: 'NormalAdmin',
            },
            {
                path: "addBook",
                name: "添加书籍",
                component: "./book/addBook",
                access: 'NormalAdmin',
            },
            {
                path: "editBook/:id",
                name: "编辑书籍",
                component: "./book/editBook",
                hideInMenu: true,
                access: 'NormalAdmin',
            },
        ],
    },
    {
        path: "/interview",
        name: "面试题",
        icon: "form",
        component: "./interview",
        access: 'NormalAdmin',
    },
    {
        path: "/issue",
        name: "问答",
        icon: "questionCircle",
        component: "./issue",
        access: 'NormalAdmin',
    },
    {
        name: " 问答详情",
        path: "/issue/:id",
        component: "./issue/issueDetail",
        hideInMenu: true,
        access: 'NormalAdmin',
    },
    {
        path: "/comment",
        name: "评论",
        icon: "comment",
        component: "./comment",
        access: 'NormalAdmin',
    },
    {
        path: "/type",
        name: "类型",
        icon: "appstore",
        component: "./type",
        access: 'NormalAdmin',
    },

    {
        component: "404",
        layout: false,
        path: "./*",
    },
];
