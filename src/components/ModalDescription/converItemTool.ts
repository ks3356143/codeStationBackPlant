import { DescriptionsProps } from "antd";

/**
 * 将ProTable的record转换为Description需要的items
 * @param record ProTable的record
 * @returns Description需要的items
 */
export default function converItemTool(record: any, descColumns: any[]) {
    const items: DescriptionsProps["items"] = descColumns.map((it, index) => {
        const key = it.dataIndex;
        return {
            key: `${index}`,
            label: it.title,
            children: it.render ? it.render(record[key]) : record[key],
            span: it.span,
        };
    });
    return items;
}
