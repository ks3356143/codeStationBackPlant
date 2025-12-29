import { PageContainer } from "@ant-design/pro-components";
import UserForm from "./components/userForm";

function AddUser() {
    return (
        <div>
            <PageContainer>
                <div className="container" style={{ width: "600px" }}>
                    <UserForm type="add"></UserForm>
                </div>
            </PageContainer>
        </div>
    );
}

export default AddUser;
