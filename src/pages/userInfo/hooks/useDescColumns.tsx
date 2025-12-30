import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Image, Tag } from "antd";
export default function useDescColumns() {
    const descColumns = [
        {
            title: "用户ID",
            dataIndex: "id",
            span: 2,
        },
        {
            title: "用户名",
            dataIndex: "username",
            span: 2,
        },
        {
            title: "头像",
            dataIndex: "avatar",
            span: 1,
            render: (text: any) => {
                return <Image width={100} src={API_URL + text}></Image>;
            },
        },
        {
            title: "密码",
            dataIndex: "password",
            span: 3,
        },
        {
            title: "最后登录日期",
            dataIndex: "last_login",
            span: 1,
        },
        {
            title: "创建日期",
            dataIndex: "date_joined",
            span: 1,
        },
        {
            title: "姓",
            dataIndex: "first_name",
            span: 1,
        },
        {
            title: "名",
            dataIndex: "last_name",
            span: 1,
        },

        {
            title: "昵称",
            dataIndex: "name",
            span: 1,
        },
        {
            title: "管理员级别",
            dataIndex: "permission",
            span: 1,
            render(text: number) {
                return text === 1 ? (
                    <Tag color="red">超级管理员</Tag>
                ) : (
                    <Tag color="blue">普通管理员</Tag>
                );
            },
        },
        {
            title: "是否在使用",
            dataIndex: "enabled",
            span: 1,
            render(text: boolean) {
                return text ? (
                    <CheckCircleOutlined
                        style={{ color: "#52c41a", fontSize: 24 }}
                    /> // 成功绿色
                ) : (
                    <CloseCircleOutlined
                        style={{ color: "#f5222d", fontSize: 24 }}
                    /> // 错误红色
                );
            },
        },
        {
            title: "邮箱",
            dataIndex: "email",
            span: 1,
        },
        {
            title: "分数",
            dataIndex: "points",
            span: 2,
        },
        {
            title: "QQ",
            dataIndex: "qq",
            span: 1,
        },
        {
            title: "微信",
            dataIndex: "wechat",
            span: 1,
        },
        {
            title: "介绍",
            dataIndex: "intro",
            span: 4,
        },
    ];
    return descColumns;
}
