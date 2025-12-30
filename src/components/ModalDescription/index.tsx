import { UserType } from "@/pages/userInfo/types";
import { Descriptions, Modal } from "antd";
import converItemTool from "./converItemTool";
type Props = {
    open: boolean;
    onClose: () => void;
    info: UserType;
    descColumns: any[];
};

const ModalDescription = (props: Props) => {
    let items = [];
    if (props.info) {
        items = converItemTool(props.info, props.descColumns);
    }
    return (
        <Modal
            title="用户详情"
            open={props.open}
            onCancel={props.onClose}
            footer={null}
            width="80%"
        >
            <Descriptions bordered items={items} layout="vertical" column={4}></Descriptions>
        </Modal>
    );
};

export default ModalDescription;
