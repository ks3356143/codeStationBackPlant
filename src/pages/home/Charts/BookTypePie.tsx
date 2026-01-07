import { Pie } from "@ant-design/plots";

const BookTypePie = () => {
    const config = {
        title: "书籍分类数量",
        data: [
            { type: "分类一", value: 27 },
            { type: "分类二", value: 25 },
            { type: "分类三", value: 18 },
            { type: "分类四", value: 15 },
            { type: "分类五", value: 10 },
            { type: "其他", value: 5 },
        ],
        angleField: "value",
        colorField: "type",
        label: {
            text: "value",
            style: {
                fontWeight: "bold",
            },
        },
        legend: {
            color: {
                title: false,
                position: "right",
                rowPadding: 5,
            },
        },
    };
    return <Pie {...config} />;
};
export default BookTypePie;
