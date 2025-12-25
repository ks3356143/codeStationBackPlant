import { useModel } from "@umijs/max";
import { createStyles } from "antd-style";
import React from "react";

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    const { initialState } = useModel("@@initialState");
    const { currentUser } = initialState || {};
    return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            display: "flex",
            height: "48px",
            marginLeft: "auto",
            overflow: "hidden",
            alignItems: "center",
            padding: "0 8px",
            cursor: "pointer",
            borderRadius: token.borderRadius,
            "&:hover": {
                backgroundColor: token.colorBgTextHover,
            },
        },
    };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
    menu,
    children,
}) => {
    /**
     * 退出登录，并且将当前的 url 保存
     */
};
