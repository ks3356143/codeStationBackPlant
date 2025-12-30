import { RollbackOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { FloatButton } from "antd";
import UserForm from "./components/userForm";

const EditUset = () => {
    const navigate = useNavigate();
    return (
        <div>
            <PageContainer>
                <FloatButton
                    shape="square"
                    tooltip="返回用户列表"
                    onClick={() => navigate("/userInfo/userList")}
                    icon={<RollbackOutlined />}
                    type="primary"
                />
                <div className="container" style={{ width: "600px" }}>
                    <UserForm></UserForm>
                </div>
            </PageContainer>
        </div>
    );
};

export default EditUset;
