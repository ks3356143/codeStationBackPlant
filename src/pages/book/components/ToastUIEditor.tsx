import "@toast-ui/editor/dist/i18n/zh-cn";
import "@toast-ui/editor/dist/toastui-editor.css";
import type { EditorProps } from "@toast-ui/react-editor";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

export interface ToastProps extends Omit<EditorProps, "onChange"> {
    ref?: any;
    value?: string;
    width?: string;
    onChange?: (value: string) => void;
}

const ToastUIEditorField = ({
    value,
    onChange,
    width,
    ref,
    initialEditType = "markdown",
    ...editorProps
}: ToastProps) => {
    // 内部 ref 用于访问 Editor 实例
    const internalEditorRef = useRef<Editor>(null);
    const editorWidth = width ? width : "92%";
    // 将内部 ref 暴露给父组件
    useEffect(() => {
        if (ref) {
            if (typeof ref === "function") {
                ref({
                    getInstance: () => internalEditorRef.current?.getInstance(),
                    getMarkdown: () =>
                        internalEditorRef.current?.getInstance()?.getMarkdown(),
                    getHTML: () =>
                        internalEditorRef.current?.getInstance()?.getHTML(),
                });
            } else if ("current" in ref) {
                ref.current = {
                    getInstance: () => internalEditorRef.current?.getInstance(),
                    getMarkdown: () =>
                        internalEditorRef.current?.getInstance()?.getMarkdown(),
                    getHTML: () =>
                        internalEditorRef.current?.getInstance()?.getHTML(),
                };
            }
        }
    }, [ref]);

    // 处理编辑器内容变化
    const handleChange = () => {
        if (onChange) {
            const markdown =
                internalEditorRef.current?.getInstance()?.getMarkdown() || "";
            onChange(markdown);
        }
    };
    return (
        <div
            style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: editorWidth,
                maxWidth: editorWidth,
                overflow: "hidden",
            }}
        >
            <Editor
                ref={internalEditorRef}
                initialValue={value || ""}
                initialEditType={initialEditType}
                previewStyle="tab"
                height="200px"
                language="zh-CN"
                onChange={handleChange}
                {...editorProps}
            />
        </div>
    );
};

export default ToastUIEditorField;
