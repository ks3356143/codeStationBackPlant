import { RollbackOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { useNavigate } from "@umijs/max";
import { FloatButton } from "antd";
import BookForm from "./components/bookForm";

const EditBook = () => {
    const navigate = useNavigate();
    return (
        <div>
            <PageContainer>
                <FloatButton
                    shape="square"
                    tooltip="返回用户列表"
                    onClick={() => navigate("/book/bookList")}
                    icon={<RollbackOutlined />}
                    type="primary"
                />
                <div
                    className="container"
                    style={{
                        width: "1000px",
                    }}
                >
                    <BookForm></BookForm>
                </div>
            </PageContainer>
        </div>
    );
};

export default EditBook;
