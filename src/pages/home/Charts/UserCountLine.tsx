import { Line } from "@ant-design/plots";

const UserCountLine = () => {
    const data = [
        { month: "1月", value: 3 },
        { month: "2月", value: 4 },
        { month: "3月", value: 3.5 },
        { month: "4月", value: 5 },
        { month: "5月", value: 4.9 },
        { month: "6月", value: 6 },
        { month: "7月", value: 7 },
        { month: "8月", value: 9 },
        { month: "9月", value: 13 },
        { month: "10月", value: 13 },
        { month: "11月", value: 13 },
        { month: "12月", value: 13 },
    ];
    const config = {
        title: "用户数量月图",
        data,
        xField: "month",
        yField: "value",
        point: {
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };
    return <Line {...config} />;
};
export default UserCountLine;
