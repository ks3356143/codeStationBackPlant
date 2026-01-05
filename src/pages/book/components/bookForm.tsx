import bookApi from "@/api/book";
import {
    ProForm,
    ProFormSelect,
    ProFormText,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import { useLocation, useNavigate } from "@umijs/max";
import { Button, Col, Row, Space } from "antd";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import useSelectFunc from "../hooks/useSelectFunc";
import ToastUIEditorField from "./ToastUIEditor";

type Props = {
    type?: "add";
};

const BookForm = ({ type }: Props) => {
    const formRef = useRef(null);
    const editorRef = useRef<any>(null);
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    // 初始化数据（新增则初始化空）
    const location = useLocation();
    const locationState = location.state as any;
    const getInitialValue = () => {
        if (!locationState) return {};
        return {
            ...locationState,
            type_id: locationState.type?.id,
            picture: locationState.picture
                ? [
                      {
                          uid: "-1",
                          name: "avatar",
                          status: "done",
                          url: API_URL + locationState.picture,
                      },
                  ]
                : [],
        };
    };
    // 防止ts报错
    const UploadComponent = ProFormUploadButton as any;
    // 书籍类型远程获取的函数
    const fetchTypeOptions = useSelectFunc();
    // 后续修改value的类型
    const handleFinish = async (value: any) => {
        startTransition(async () => {
            if (type === "add") {
                try {
                    if (value.picture) {
                        value.picture = value.picture[0].response.data;
                        value.picture = value.picture.replace("/media/", "");
                    }
                    await bookApi.addBook({ ...value });
                    toast.success("添加书籍成功，跳转列表页面");
                    navigate("/book/bookList");
                } catch (e) {
                    toast.error("添加错误，请检查字段信息!");
                }
            } else {
                try {
                    if (value.picture) {
                        value.picture = value.picture[0].url;
                        value.picture = value.picture.replace(
                            API_URL + "/media/",
                            ""
                        );
                    }
                    await bookApi.updateBook(locationState.id, { ...value });
                    toast.success("修改数据成功，跳转列表页面");
                    navigate("/book/bookList");
                } catch (e) {
                    console.log(e);
                    toast.error("修改错误，请联系管理员!");
                }
            }
        });
    };
    return (
        <ProForm
            onFinish={handleFinish}
            formRef={formRef}
            initialValues={getInitialValue()}
            labelCol={{ flex: "120px" }}
            wrapperCol={{ flex: 1 }}
            submitter={{
                render: (props) => {
                    return (
                        <Row>
                            <Col span={24} offset={6}>
                                <Space>
                                    <Button
                                        key="submit"
                                        type="primary"
                                        onClick={() => {
                                            props.form?.submit?.();
                                        }}
                                        loading={isPending}
                                    >
                                        {type === "add"
                                            ? "确认新增"
                                            : "提交修改"}
                                    </Button>
                                    {
                                        <Button
                                            key="rest"
                                            onClick={() =>
                                                props.form?.resetFields()
                                            }
                                            disabled={isPending}
                                        >
                                            重置
                                        </Button>
                                    }
                                </Space>
                            </Col>
                        </Row>
                    );
                },
            }}
            layout="horizontal"
        >
            <ProFormText
                name="title"
                width="md"
                label="书籍名称"
                placeholder="请输入书籍名称"
                rules={[{ required: true, message: "书籍名称必填" }]}
            />
            {/* 这里要使用toastUIEditor自定义表单项 */}
            <ProForm.Item
                name="bookInfo"
                label="文章内容"
                rules={[{ required: true, message: "内容不能为空" }]}
            >
                <ToastUIEditorField
                    ref={editorRef}
                    height="400px"
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            // 实现图片上传
                            // 示例：调用你的上传API
                            const formData = new FormData();
                            formData.append("file", blob);
                            // const result = await uploadApi(formData);
                            // callback(result.url, '图片描述');
                        },
                    }}
                />
            </ProForm.Item>
            <ProFormText
                name="downloadLink"
                label="下载链接"
                width="lg"
                placeholder="请输入下载链接"
                rules={[{ required: true, message: "下载链接必填" }]}
            />
            <ProFormSelect
                name="requirePoints"
                label="所需积分"
                width="md"
                valueEnum={{
                    0: "不需积分",
                    10: "10",
                    20: "20",
                    30: "30",
                    40: "40",
                    50: "50",
                }}
                placeholder="请选择所需积分"
                rules={[{ required: true, message: "所需积分必填" }]}
            />
            <ProFormSelect
                name="type_id"
                label="书籍分类"
                width="md"
                placeholder="请选择书籍分类"
                request={fetchTypeOptions}
                rules={[{ required: true, message: "书籍分类必选" }]}
            ></ProFormSelect>
            <UploadComponent
                name="picture"
                listType="picture-card"
                label="书籍封面"
                max={1}
                action="/api/common/avatar?file_type=book"
            ></UploadComponent>
        </ProForm>
    );
};

export default BookForm;
