import { PageContainer } from "@ant-design/pro-components";
import BookForm from "./components/bookForm";

const AddBook = () => {
    return (
        <div>
            <PageContainer>
                <div className="container" style={{ width: "1000px" }}>
                    <BookForm type='add'></BookForm>
                </div>
            </PageContainer>
        </div>
    );
};

export default AddBook;
